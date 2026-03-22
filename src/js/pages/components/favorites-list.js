import { getFavorite, removeFavorite } from "../../lib/favorites.js";

class FavoritesList extends HTMLElement {
  static observedAttributes = ["title", "artist-id", "song-id", "song"];
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `<li>
                  <h3>${this.getAttribute("title")}</h3>
            <div class="options">
              <button class="remove_favorite sml-btn">
                <i class="fa-solid fa-heart"></i>
              </button>
              <a href="#play?${this.getAttribute("artist-id")}/${this.getAttribute("song-id")}" class="sml-btn">
                <i class="fa-solid fa-play"></i>
              </a>
            </div>
          </li>`;
    let toggleFavorite = this.querySelector(".remove_favorite");
    toggleFavorite.addEventListener("click", () => {
      console.log("Removed");
      removeFavorite(
        this.getAttribute("artist-id") + "/" + this.getAttribute("song-id"),
      );
      this.dispatchEvent(
        new CustomEvent("favorite-removed", { bubbles: true }),
      );
    });
  }
}
customElements.define("favorites-list", FavoritesList);
