import { getSongs } from "../lib/api.js";
let currentSongList = [];
let currentSong = null;

export class pagePlay extends HTMLElement {
  connectedCallback() {
    this.currentIndex = 0;
    this.render();
    this.addEventListener("next-song", () => {
      this.playNext();
    });
    this.addEventListener("previous-song", () => {
      this.playPrevious();
    });
    this.loadSong();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `<section id="play-section" class="centered">
      </section>
    `;
  }

  renderSong(result) {
    currentSong = result;
    const playSection = this.querySelector("#play-section");
    playSection.innerHTML = "";
    const element = document.createElement("play-song");
    element.setAttribute("artist-id", result.artist.id);
    element.setAttribute("song-id", result.id);
    element.setAttribute("cover", result.artist.image_url);
    element.setAttribute("title", result.title);
    element.setAttribute("artist-name", result.artist.name);
    element.setAttribute("audio-url", result.audio_url);
    playSection.appendChild(element);
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
      this.renderSong(currentSong);
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
