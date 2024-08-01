export class HbnbRadio extends HTMLElement {
    constructor() {
      super();
    }

    // connect component
    connectedCallback() {
        let name = this.attributes.name.value
        let value = this.attributes.value.value
        let label = this.attributes.label.value
        let checked = this.attributes.checked ? "checked" : ""

        this.innerHTML = `
            <label>
                <input type="radio" name="` + name + `" value="` + value + `" ` + checked + ` />
                <label for="radio"><img src="../static/img/` + label + `.png"></label>
                <div>` + label + `</div>
            </label>
        `;
    }
}

window.customElements.define('hbnb-radio', HbnbRadio);