import "normalize.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { audio } from "./pages/components/player.js";
import { pageArtists } from "./pages/page-artists.js";
import { pageListSongs } from "./pages/page-list.js";
import { pagePlay } from "./pages/page-play.js";
import { pageFavorites } from "./pages/page-favorites.js";
import { pageSearch } from "./pages/page-search.js";
import "./pages/components/artist-cover.js";
import "./pages/components/song-list.js";
import "./pages/components/favorites-list.js";
import "./pages/components/player.js";
import "./pages/components/nav.js";

audio.addEventListener("ended", () => {
  playNextSong();
});

class pageIndex extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `<section id="welcome-section" class="centered">
        <h1>Bienvenue sur Spotlified</h1>
        <a class="btn-solid" href="#favorites">Vers les favoris</a>
        <a class="btn-solid" href="#artists">Vers les artistes</a>
      </section>
    `;
  }
}

const displaySection = () => {
  const main = document.querySelector("main");
  const hash = window.location.hash || "#index";
  const [route, info] = hash.split("?");
  const searchBar = document.querySelector("#search-bar");

  switch (route) {
    case "#index":
      main.innerHTML = "<page-index />";
      searchBar.style.display = "none";
      break;
    case "#play":
      main.innerHTML = `<page-play />`;
      searchBar.style.display = "none";
      break;
    case "#artists":
      main.innerHTML = "<page-artists />";
      searchBar.style.display = "none";
      break;
    case "#list":
      main.innerHTML = `<page-list-songs />`;
      searchBar.style.display = "none";
      break;
    case "#favorites":
      main.innerHTML = "<page-favorites />";
      searchBar.style.display = "none";
      break;
    case "#search":
      main.innerHTML = "<page-search />";
      searchBar.style.display = "block";
      break;
  }
};

customElements.define("page-index", pageIndex);
customElements.define("page-play", pagePlay);
customElements.define("page-artists", pageArtists);
customElements.define("page-list-songs", pageListSongs);
customElements.define("page-favorites", pageFavorites);
customElements.define("page-search", pageSearch);

window.addEventListener("hashchange", displaySection);
displaySection();
