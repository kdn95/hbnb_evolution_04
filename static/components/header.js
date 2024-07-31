// HbnbHeader is a subclass of HTMLElement
// This turns HbnbHeader into a web component
export class HbnbHeader extends HTMLElement {
    constructor() {
      super();
    }

    // connect component
    connectedCallback() {
        // const shadow = this.attachShadow({ mode: "closed" });
        this.innerHTML = `
            <div class="content">
                <div class="header-logo"></div>
                <nav class="navbar-menu">
                    <ul class="nav">
                        <li class="nav-item">
                             <a href="#" class="nav-link">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="#services" class="nav-link">About Us</a>
                        </li>
                        <li class="nav-item">
                            <a href="#works" class="nav-link">Contact</a>
                        </li>
                        <li class="nav-item">
                            <a href="/admin">Admin area</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="status">
                <a href="/admin">Admin area</a>
            </div>
        `;
    }
}
window.customElements.define('hbnb-header', HbnbHeader);