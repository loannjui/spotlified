import { getSongs } from "../lib/api.js";

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
    getSongs(artistID[1]).then((results) => {
      songsList.innerHTML = "";
      results.forEach((result) => {
        const element = document.createElement("song-list");
        element.setAttribute("title", result.title);
        element.setAttribute("artist-id", result.artist.id);
        element.setAttribute("song-id", result.id);
        element.setAttribute("song", JSON.stringify(result));
        songsList.appendChild(element);
      });
    });
  }
}