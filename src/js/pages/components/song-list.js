import {
  addFavorite,
  getFavorite,
  removeFavorite,
} from "../../lib/favorites.js";

class SongList extends HTMLElement {
  static observedAttributes = ["title", "artist-id", "song-id", "song"];
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  get id() {
    return this.getAttribute("artist-id") + "/" + this.getAttribute("song-id");
  }
  render() {
    const isFavorite = getFavorite(this.id);

    this.innerHTML = `<li>
      <h3>${this.getAttribute("title")}</h3>
      <div class="options">
        <button class="${isFavorite ? "remove_favorite" : "add_favorite"} sml-btn">
          <i class="fa-solid fa-heart"></i>
        </button>
        <a href="#play?${this.id}" class="sml-btn">
          <i class="fa-solid fa-play"></i>
        </a>
      </div>
    </li>`;

    const btn = this.querySelector("button");
    btn.addEventListener("click", () => {
      if (isFavorite) {
        removeFavorite(this.id);
      } else {
        addFavorite(this.id, this.getAttribute("song"));
      }
      this.render();
    });
  }
}

customElements.define("song-list", SongList);