export class pageFavorites extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <section>
        <h2>Favoris</h2>
        <div class="container">
          <ul id="favorites">
          </ul>
        </div>
      </section>
    `;
    const favoritesList = this.querySelector("#favorites");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || {};

    Object.values(favorites).forEach((song) => {
      const element = document.createElement("favorites-list");
      element.setAttribute("title", song.title);
      element.setAttribute("artist-id", song.artist.id);
      element.setAttribute("song-id", song.id);
      element.setAttribute("song", JSON.stringify(song));

      element.addEventListener("favorite-removed", () => {
        element.remove();
      });

      favoritesList.appendChild(element);
    });
  }
}
