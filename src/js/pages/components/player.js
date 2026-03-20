export const audio = document.querySelector("#player");

class playSong extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
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
        </div>`;
  }
}
customElements.define("play-song", playSong);
