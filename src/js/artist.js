const urlArtists = "https://webmob-ui-22-spotlified.herokuapp.com/api/artists";
const artistContainer = document.querySelector("#artist-container");

async function getArtists() {
  return fetch(urlArtists).then((response) => response.json());
}



async function displayArtists() {
  getArtists()
    .then((artists) => {
      artistContainer.innerHTML = "";
      artists.forEach((artist) => {
        const element = document.createElement("artist-cover");
        element.setAttribute("title", artist.name);
        element.setAttribute("cover", artist.image_url);
        artistContainer.appendChild(element);
      });
    })
    .catch((err) => console.error(err));
}

class ArtistCover extends HTMLElement {
  static observedAttributes = ["cover", "title"];
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
        <img class="img-responsive" src="${this.getAttribute("cover")}" alt="${this.getAttribute("title")}" />
        <p class="artist-name">${this.getAttribute("title")}</p>
    `;
  }
}
customElements.define("artist-cover", ArtistCover);