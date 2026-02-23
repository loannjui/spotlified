import "normalize.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  pageIndex,
  pagePlay,
  pageArtists,
  pageFavorites,
  pageSearch,
  pageListSongs,
} from "./pages.js";

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