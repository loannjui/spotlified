
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
