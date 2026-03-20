import { currentSong } from "../page-play.js";

class bottomNav extends HTMLElement {
  connectedCallback() {
    this.render();
    this.updatePlayLink();

    this.querySelector("#play-link").addEventListener("click", () =>
      this.updatePlayLink(),
    );
  }

  render() {
    this.innerHTML = `
      <a href="#index">
        <i class="fa-solid fa-house"></i>
        <p>Accueil</p>
      </a>
      <a id="play-link" href="#play?1/1">
        <i class="fa-solid fa-play"></i>
        <p>Play</p>
      </a>
      <a href="#artists">
        <i class="fa-solid fa-guitar"></i>
        <p>Artistes</p>
      </a>
      <a href="#favorites">
        <i class="fa-solid fa-heart"></i>
        <p>Favoris</p>
      </a>
    `;
  }

  updatePlayLink() {
    const playLink = this.querySelector("#play-link");

    if (!currentSong) return;

    playLink.href = `#play?${currentSong.artist.id}/${currentSong.id}`;
  }
}

customElements.define("bottom-nav", bottomNav);