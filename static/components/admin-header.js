export class HbnbAdminHeader extends HTMLElement {
    constructor() {
      super();
    }

    // connect component
    connectedCallback() {
        // const shadow = this.attachShadow({ mode: "closed" });
        this.innerHTML = `
            <div class="admin-content">
                <div class="admin-title">Admin Page</div>
            </div>
        `;
    }
}
window.customElements.define('hbnb-admin-header', HbnbAdminHeader);