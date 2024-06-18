import { HbnbRadio } from "../components/radio.js"

export class HbnbSearchForm extends HTMLElement {
    constructor() {
      super();
    }

    // connect component
    connectedCallback() {
        // const shadow = this.attachShadow({ mode: "closed" });

        let searchedDest = (hbnb.searched && hbnb.searched.dest) ? hbnb.searched.dest : "";
        let groupName = "destination-radio-group";
        let destinationRadioChoices = ``;

        // --- Radio inputs ---
        // First option - 'All'
        let isChecked = (searchedDest == "") ? "checked" : "";
        destinationRadioChoices += `<hbnb-radio name="` + groupName + `" value="" label="All" ` + isChecked + `></hbnb-radio>`;

        // The other options
        for (let countryCode in hbnb.destinations) {
            isChecked = (searchedDest == countryCode) ? "checked" : "";
            let countryName = hbnb.destinations[countryCode];

            destinationRadioChoices += `<hbnb-radio name="` + groupName + `" value="` + countryCode + `" label="` + countryName + `" ` + isChecked + ` ></hbnb-radio>`;
        }

        // TODO: amenities options

        this.innerHTML = `
            <div class="contents">
                <div class="destination">
                    <div class="title">Destination</div>
                    <div class="choice">`
                        + destinationRadioChoices +
                    `</div>
                </div>
                <div class="amenities">
                    <div class="title">Amenities</div>
                    <div class="choice">
                    </div>
                </div>
            </div>
        `;
    }
}
window.customElements.define('hbnb-search-form', HbnbSearchForm);