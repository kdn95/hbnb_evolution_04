import { HbnbCheckbox } from "./checkbox.js"

export class HbnbAmenities extends HTMLElement {
    static menuVisibleState = "hide";
    static self;

    constructor() {
      super();
    }

    // connect component
    connectedCallback() {
        // store a ref to the component
        HbnbAmenities.self = this;

        let amenCheckboxesHtml = HbnbAmenities.#createAmenitiesMenuCheckboxes()

        // Note that the submenu div is purposely placed before the button.
        // This is becuase the CSS I use to create the arrow animation
        // uses the 'sibling' selector and it will only work if the button is after the div.
        this.innerHTML = `
            <div id="amenities-submenu" state="` + HbnbAmenities.menuVisibleState + `">
                <div class="instruct">
                    Choose the ones that you want
                </div>
                <div class="items">`
                    + amenCheckboxesHtml +
                `</div>
                <div class="confirm">
                    <button id="btn-specific-amenities-ok" type="button">OK</button>
                </div>
            </div>
            <button id="btn-specific-amenities-select" type="button">
                <span>Please select</span>
                <span class="arrows">&raquo;</span>
            </button>
        `;

        // Let's add back the click event listener for the button in this component
        // https://stackoverflow.com/questions/72067223/javascript-web-components-add-function-to-the-shadow-dom
        this.querySelector("#btn-specific-amenities-select").addEventListener('click', function() {
            HbnbAmenities.setMenuVisilibity("show")
        });

        this.querySelector("#btn-specific-amenities-ok").addEventListener('click', function() {
            HbnbAmenities.setMenuVisilibity("hide")
        });
    }

    static #createAmenitiesMenuCheckboxes() {
        let searchedAmen = [];

        // hbnb.searched.amen will either be an empty string (All) or an array of stuff (Specific)
        if (hbnb.searched && hbnb.searched.amen && Array.isArray(hbnb.searched.amen) && hbnb.searched.amen.length > 0) {
            searchedAmen = hbnb.searched.amen
        }

        // At this point, searchedAmen is either an empty array or an array containing the previous choices

        let amenGroupName = "amenities-specific-group[]";
        let amenCheckboxesHtml = ``;

        for (let amenityId in hbnb.amenities) {
            let isAmenChecked = ((searchedAmen.length > 0 && searchedAmen.includes(amenityId)) || searchedAmen.length == 0) ? "checked" : "";
            let amenityName = hbnb.amenities[amenityId];

            // If searchedAmen was empty, all checkboxes will be checked.
            // Otherwise, only a few specific amenities will be checked

            amenCheckboxesHtml += `<hbnb-checkbox name="` + amenGroupName + `" value="` + amenityId + `" label="` + amenityName + `" ` + isAmenChecked + ` ></hbnb-checkbox>`;
        }

        return amenCheckboxesHtml;
    }

    static setMenuVisilibity(state) {
        let currState = HbnbAmenities.menuVisibleState;
        if (state == "toggle") {
            currState = (currState == "hide") ? "show" : "hide";
        } else {
            currState = state;
        }
        HbnbAmenities.menuVisibleState = currState;
        HbnbAmenities.self.querySelector("#amenities-submenu").setAttribute("state", HbnbAmenities.menuVisibleState);
    }
}

window.customElements.define('hbnb-amenities', HbnbAmenities);