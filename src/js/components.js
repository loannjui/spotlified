class ArtistCover extends HTMLElement {
  static observedAttributes = ["cover", "artist-id", "title"];
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <a href="#list?${this.getAttribute("artist-id")}">
        <img class="img-responsive" src="${this.getAttribute("cover")}" alt="${this.getAttribute("title")}" />
        <p class="artist-name">${this.getAttribute("title")}</p>
        </a>
    `;
  }
}
customElements.define("artist-cover", ArtistCover);

class SongList extends HTMLElement {
  static observedAttributes = ["title", "artist-id", "song-id"];
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
              <a href="#play?${this.getAttribute("artist-id")}/${this.getAttribute("song-id")}" class="sml-btn">
                <i class="fa-solid fa-play"></i>
              </a>
            </div>
          </li>`;
  }
}
customElements.define("song-list", SongList);

class SearchResults extends HTMLElement {
  static observedAttributes = ["title", "artist-id", "song-id"];
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
              <a href="#play?${this.getAttribute("artist-id")}/${this.getAttribute("song-id")}" class="sml-btn">
                <i class="fa-solid fa-play"></i>
              </a>
            </div>
            </li>`;
  }
}
customElements.define("search-results", SearchResults);

class playSong extends HTMLElement {
  static observedAttributes = [
    "cover",
    "title",
    "artist-name",
  ];
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `<img src="${this.getAttribute("cover")}" class="album-img" />
        <h1>${this.getAttribute("artist-name")}</h1>
        <h3>${this.getAttribute("title")}
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
        </div>`;
  }
}
customElements.define("play-song", playSong);