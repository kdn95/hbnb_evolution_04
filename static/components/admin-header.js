export class HbnbAdminHeader extends HTMLElement {
    constructor() {
      super();
    }

    // connect component
    connectedCallback() {
        // const shadow = this.attachShadow({ mode: "closed" });
        this.innerHTML = `
            <div class="admin-content">
                <div class="admin-title">
                    <h1><a href="#0">Admin Page</a></h1>
                </div>
            </div>
        `;
    }
}
window.customElements.define('hbnb-admin-header', HbnbAdminHeader);