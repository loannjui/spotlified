import { formatTimestamp } from "../../../lib/utils.js";

class playSong extends HTMLElement {
  static observedAttributes = [
    "artist-id",
    "song-id",
    "cover",
    "title",
    "artist-name",
    "audio-url",
  ];
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <img src="${this.getAttribute("cover")}" class="img-responsive" />
        <div id="audio-controls">
        <h1 class="centered">${this.getAttribute("title")}</h1>
        <h3 class="centered">${this.getAttribute("artist-name")}</h3>
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
        </div>`;

    const audio = document.querySelector("#player");
    audio.src = this.getAttribute("audio-url");

    const playBtn = this.querySelector("#play-btn");
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    this.querySelector("#forward-btn").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("next-song", { bubbles: true, composed: true }),
      );
    });

    this.querySelector("#backward-btn").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("previous-song", { bubbles: true, composed: true }),
      );
    });

    playBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
      } else {
        audio.pause();
        playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
      }
    });

    const playerProgressBar = this.querySelector("#player-progress-bar");
    const currentDuration = this.querySelector("#current-duration");
    const maxDuration = this.querySelector("#max-duration");

    audio.addEventListener("loadedmetadata", () => {
      const musicDuration = audio.duration;
      playerProgressBar.max = musicDuration;
      maxDuration.innerHTML = formatTimestamp(musicDuration);
    });
    audio.addEventListener("timeupdate", () => {
      playerProgressBar.value = audio.currentTime;
      currentDuration.innerHTML = formatTimestamp(audio.currentTime);
    });

    const avancerPlayer = (e) => {
      audio.currentTime = parseInt(e.currentTarget.value);
    };
    playerProgressBar.addEventListener("input", avancerPlayer);

    audio.addEventListener("ended", () => {
      this.dispatchEvent(
        new CustomEvent("next-song", {
          bubbles: true,
          composed: true,
        }),
      );
    });
  }
}
customElements.define("play-song", playSong);
