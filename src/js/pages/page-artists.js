import { getArtists } from "../lib/api.js";

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