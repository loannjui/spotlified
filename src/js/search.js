const searchBar = document.querySelector('input[type="search"]');
const searchResults = document.querySelector("#searchResults");

async function getSearchQuery(query) {
  let urlSongs = `https://webmob-ui-22-spotlified.herokuapp.com/api/songs/search/${query}`;
  return fetch(urlSongs).then((response) => response.json());
}

searchBar.addEventListener("input", (e) => {
  getSearchQuery(e.target.value).then((results) => {
    searchResults.innerHTML = "";
    results.forEach((result) => {
      const element = document.createElement("search-results");
      element.setAttribute("title", result.title);
      element.setAttribute("audio_url", result.audio_url);
      console.log(result.audio_url);
      searchResults.appendChild(element);
    });
  });
});


class SearchResults extends HTMLElement {
  static observedAttributes = ["title", "audio_url"];
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
              <button class="sml-btn">
                <i class="fa-solid fa-heart"></i>
              </button>
              <a href="play.html?${this.getAttribute("audio_url")}" class="sml-btn">
                <i class="fa-solid fa-play"></i>
              </a>
            </div>
          </li>`;
  }
}
customElements.define("search-results", SearchResults);