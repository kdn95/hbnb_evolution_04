// HbnbHero is a subclass of HTMLElement
// This turns HbnbHero into a web component
export class HbnbHero extends HTMLElement {
  constructor() {
    super();
  }

  // connect component
  connectedCallback() {
      // const shadow = this.attachShadow({ mode: "closed" });
      this.innerHTML = `
          <div class="section-hero">
                <h2 class="hero-title">Book the best hotel for your perfect getaway</h2>
                <h6 class="hero-para">Welcome to the HBnB accommodation booking site. Explore and book accommodation in a variety of different locations. Find your perfect stay with our amenity filters - It's that easy!</h6>
          </div>
      `;
  }
}
window.customElements.define('hbnb-hero', HbnbHero);