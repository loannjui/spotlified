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