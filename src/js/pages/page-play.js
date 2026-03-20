import { getSongs } from "../lib/api.js";
import { formatTimestamp } from "../lib/utils.js";
import { audio } from "./components/player.js";

export let currentSong = null;
export let currentSongList = [];

export class pagePlay extends HTMLElement {
  connectedCallback() {
    this.currentIndex = 0;
    this.loadSong();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    if (!currentSong) return;
    this.innerHTML = `<section id="play-section" class="centered">
        <img src="${currentSong.artist.image_url}" class="img-responsive" />
        <div id="audio-controls">
        <h1 class="centered">${currentSong.title}</h1>
        <h3 class="centered">${currentSong.artist.name}</h3>
          <div id="audio-buttons">
            <button id="backward-btn" class="btn-solid round small">
              <i class="fa-solid fa-backward"></i>
            </button>
            <button id="play-btn" class="btn-solid round">
              <i class="fa-solid fa-pause"></i>
            </button>
            <button id="forward-btn" class="btn-solid round small">
              <i class="fa-solid fa-forward"></i>
            </a>
          </div>
          <div class="duration">
          <input id="player-progress-bar" type="range" class="slider" min="0" max="0" />
          <div>
            <p id="current-duration">0:00</p><p>/</p><p id="max-duration"></p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  bindEvents() {
    const navPlay = document.querySelector("#play-link");
    const playBtn = this.querySelector("#play-btn");
    const playerProgressBar = this.querySelector("#player-progress-bar");
    const currentDuration = this.querySelector("#current-duration");
    const maxDuration = this.querySelector("#max-duration");

    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    this.querySelector("#forward-btn").addEventListener("click", () => {
      this.playNext();
    });

    this.querySelector("#backward-btn").addEventListener("click", () => {
      this.playPrevious();
    });

    playBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
      } else {
        audio.pause();
        playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
      }
    });
    const updateDuration = () => {
      const musicDuration = audio.duration;
      if (!isNaN(musicDuration)) {
        playerProgressBar.max = musicDuration;
        maxDuration.innerHTML = formatTimestamp(musicDuration);
      }
    };

    audio.addEventListener("loadedmetadata", updateDuration);
    updateDuration();

    audio.addEventListener("timeupdate", () => {
      playerProgressBar.value = audio.currentTime;
      currentDuration.innerHTML = formatTimestamp(audio.currentTime);
    });

    const avancerPlayer = (e) => {
      audio.currentTime = parseInt(e.currentTarget.value);
    };
    playerProgressBar.addEventListener("input", avancerPlayer);

    navPlay.href = `#play?${currentSong.artist.id}/${currentSong.id}`;

    if (!audio.src.includes(currentSong.audio_url)) {
      audio.src = currentSong.audio_url;
    }
  }

  renderSong(result) {
    currentSong = result;
    const playSection = this.querySelector("#play-section");
    playSection.innerHTML = "";
    const element = document.createElement("play-song");
    playSection.appendChild(element);

    this.render();
    this.bindEvents();
  }

  loadSong() {
    const ids = window.location.hash.split("?");
    const arrayIDs = ids[1].split("/");
    this.linkArtist = arrayIDs[0];
    this.linkSong = arrayIDs[1];
    getSongs(this.linkArtist).then((results) => {
      currentSongList = results;
      this.currentIndex = currentSongList.findIndex(
        (song) => parseInt(this.linkSong) === song.id,
      );

      currentSong = currentSongList[this.currentIndex];

      this.render(); // ✅ ici
      this.bindEvents(); // ✅ ici
    });
  }

  playSong(song, songs) {
    currentSong = song;
    if (songs) currentSongList = songs;
    this.currentIndex = currentSongList.findIndex((s) => s.id === song.id);
    this.renderSong(song);
  }

  playNext() {
    this.currentIndex++;
    if (this.currentIndex >= currentSongList.length) this.currentIndex = 0;
    currentSong = currentSongList[this.currentIndex];
    this.renderSong(currentSong);
  }

  playPrevious() {
    this.currentIndex--;
    if (this.currentIndex < 0) this.currentIndex = currentSongList.length - 1;
    currentSong = currentSongList[this.currentIndex];
    this.renderSong(currentSong);
  }
}
