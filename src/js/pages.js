import { getArtists, getSearchQuery, getSongs } from "./api";
import "./components";

export class pageIndex extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `<section id="welcome-section" class="centered">
        <h1>Bienvenue sur Spotlified</h1>
        <a class="btn-solid" href="favoris.html">Vers les favoris</a>
        <a class="btn-solid" href="artistes.html">Vers les artistes</a>
      </section>
    `;
  }
}

export class pageArtists extends HTMLElement {
  connectedCallback() {
    this.render();
    this.loadArtists();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `<section>
        <h2>Artistes</h2>
        <div id="artist-container" class="container">
        </div>
      </section>
    `;
  }
  loadArtists() {
    const artistContainer = this.querySelector("#artist-container");
    getArtists()
      .then((artists) => {
        artistContainer.innerHTML = "";
        artists.forEach((artist) => {
          const element = document.createElement("artist-cover");
          element.setAttribute("title", artist.name);
          element.setAttribute("artist-id", artist.id);
          element.setAttribute("cover", artist.image_url);
          artistContainer.appendChild(element);
        });
      })
      .catch((err) => console.error(err));
  }
}

export class pageListSongs extends HTMLElement {
  connectedCallback() {
    this.render();
    this.loadSongs();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `<section>
        <h2>Liste musique</h2>
        <div class="container">
          <ul id="songsList">
          </ul>
        </div>
      </section>
    `;
  }
  loadSongs() {
    const songsList = document.querySelector("#songsList");
    const artistID = window.location.hash.split("?");
    console.log(artistID[1]);
      getSongs(artistID[1]).then((results) => {
        songsList.innerHTML = "";
        results.forEach((result) => {
          const element = document.createElement("song-list");
          element.setAttribute("title", result.title);
          element.setAttribute("artist-id", result.artist.id);
          element.setAttribute("song-id", result.id);
          songsList.appendChild(element);
        });
      });
  }
}

export class pageFavorites extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = ` <section>
        <h2>Favoris</h2>
        <div class="container">
          <ul id="favorites">
            <li>
              <h3>Never Going Home</h3>
              <div class="options">
                <button class="sml-btn" href="#">
                  <i class="fa-solid fa-heart"></i>
                </button>
                <a class="sml-btn" href="#">
                  <i class="fa-solid fa-play"></i>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>
    `;
  }
}

export class pagePlay extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `<section id="artist-section" class="centered">

        <img src="http://placecats.com/300/300" class="album-img" />
        <div id="audio-controls">
          <div id="audio-buttons">
            <button class="btn-solid round small">
              <i class="fa-solid fa-backward"></i>
            </button>
            <button class="btn-solid round">
              <i class="fa-solid fa-play"></i>
            </button>
            <button class="btn-solid round small">
              <i class="fa-solid fa-forward"></i>
            </button>
          </div>
          <input type="range" class="slider" min="0" max="100" value="50" />
        </div>
      </section>
    `;
  }
}


export class pageSearch extends HTMLElement {
  connectedCallback() {
    this.render();
    this.loadSearch();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `      <section>
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
