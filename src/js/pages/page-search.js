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
        <h2>Recherche - Something</h2>
        <div class="container">
          <ul id="searchResults">
          </ul>
        </div>
      </section>
    `;
  }
  loadSearch() {
    const searchBar = document.querySelector('input[type="search"]');
    const searchResults = document.querySelector("#searchResults");
    searchBar.addEventListener("input", (e) => {
      getSearchQuery(e.target.value).then((results) => {
        searchResults.innerHTML = "";
        results.forEach((result) => {
          const element = document.createElement("search-results");
          element.setAttribute("title", result.title);
          element.setAttribute("artist-id", result.artist.id);
          element.setAttribute("song-id", result.id);
          searchResults.appendChild(element);
        });
      });
    });
  }
}
