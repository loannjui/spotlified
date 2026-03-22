import { getSearchQuery } from "../lib/api.js";

export class pageSearch extends HTMLElement {
  connectedCallback() {
    this.render();
    this.loadSearch();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `<section>
        <h2>Recherche</h2>
        <div class="container">
          <ul id="songsList">
          </ul>
        </div>
      </section>
    `;
  }
  loadSearch() {
    const searchBar = document.querySelector('input[type="search"]');
    const titleSearch = document.querySelector("h2");
    searchBar.addEventListener("input", (e) => {
      window.location.hash = "#search?" + encodeURIComponent(e.target.value);
    });
    let search = window.location.hash.split("?")[1];
    getSearchQuery(search).then((results) => {
      const searchResults = document.querySelector("#songsList");
      titleSearch.innerHTML = (search === undefined) ? "Recherche" : "Recherche : " + decodeURIComponent(search);
      searchResults.innerHTML = "";
      results.forEach((result) => {
        const element = document.createElement("song-list");
        element.setAttribute("title", result.title);
        element.setAttribute("artist-id", result.artist.id);
        element.setAttribute("song-id", result.id);
        element.setAttribute("song", JSON.stringify(result));
        searchResults.appendChild(element);
      });
    });
  }
}
