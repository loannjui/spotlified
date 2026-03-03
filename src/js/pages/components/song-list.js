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