class bottomNav extends HTMLElement {
  connectedCallback() {
    this.render();
    this.updatePlayLink();

    // Écoute les changements de chanson
    document.addEventListener("song-changed", () => this.updatePlayLink());
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <a href="#index">
        <i class="fa-solid fa-house"></i>
        <p>Accueil</p>
      </a>
      <a id="play-link" href="#play">
        <i class="fa-solid fa-play"></i>
        <p>Play</p>
      </a>
      <a href="#artists">
        <i class="fa-solid fa-guitar"></i>
        <p>Artistes</p>
      </a>
      <a href="#favorites">
        <i class="fa-solid fa-heart"></i>
        <p>Favoris</p>
      </a>
    `;
  }
}
customElements.define("bottom-nav", bottomNav);
