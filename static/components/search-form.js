import { HbnbRadio } from "./radio.js"
import { HbnbAmenities } from "./amenities.js"

export class HbnbSearchForm extends HTMLElement {
    static self;

    constructor() {
      super();
    }

    // connect component
    connectedCallback() {
        // store a ref to the component
        HbnbSearchForm.self = this;

        // const shadow = this.attachShadow({ mode: "closed" });

        let destRadiosHtml = HbnbSearchForm.#createDestinationRadios()
        let amenRadiosHtml = HbnbSearchForm.#createAmenitiesRadios()

        // --- HTML ---
        this.innerHTML = `
            <div class="contents">
                <div class="destination">
                    <div class="title">Destination</div>
                    <div class="choice">`
                        + destRadiosHtml +
                    `</div>
                </div>
                <div class="amenities">
                    <div class="title">Amenities</div>
                    <div class="choice">`
                        + amenRadiosHtml +
                        `<hbnb-amenities></hbnb-amenities>
                    </div>
                </div>
                <div class="search">
                    <button id="btn-menu-search" type="submit">Search &raquo;</button>
                </div>
            </div>
        `;

        HbnbSearchForm.#init();
    }


    // --- Private Methods ---

    static #createDestinationRadios() {
        let searchedDest = (hbnb.searched && hbnb.searched.dest) ? hbnb.searched.dest : "";
        let destGroupName = "destination-radio-group";
        let destRadiosHtml = ``;

        // First option - 'All'
        let isDestChecked = (searchedDest == "") ? "checked" : "";
        destRadiosHtml += `<hbnb-radio name="` + destGroupName + `" value="" label="All" ` + isDestChecked + `></hbnb-radio>`;

        // The other options
        for (let countryCode in hbnb.destinations) {
            isDestChecked = (searchedDest == countryCode) ? "checked" : "";
            let countryName = hbnb.destinations[countryCode];

            destRadiosHtml += `<hbnb-radio name="` + destGroupName + `" value="` + countryCode + `" label="` + countryName + `" ` + isDestChecked + ` ></hbnb-radio>`;
        }

        return destRadiosHtml;
    }

    static #createAmenitiesRadios() {
        // searchedAmen will either be an empty string or an array of stuff
        let searchedAmen = (hbnb.searched && hbnb.searched.amen) ? hbnb.searched.amen : "";
        let amenGroupName = "amenities-radio-group";
        let amenRadiosHtml = ``;
        
        // Only two radios - 'All' or 'Specific'
        let isAmenAllChecked = (searchedAmen == "" || searchedAmen.length == 0) ? "checked" : "";
        let isAmenSpecificChecked = (isAmenAllChecked == "") ? "checked" : "";

        amenRadiosHtml += `<hbnb-radio name="` + amenGroupName + `" value="" label="All" ` + isAmenAllChecked + `></hbnb-radio>`;
        amenRadiosHtml += `<hbnb-radio name="` + amenGroupName + `" value="specific" label="Specific" ` + isAmenSpecificChecked + `></hbnb-radio>`;

        return amenRadiosHtml;
    }

    static #submit() {
        // assemble the data from the selections in the form
        // console.log(hbnb.form.request.amenities);

        let submitData = hbnb.form.request;
        console.log(submitData)
    }

    // --- Init ---

    static #init() {
        let destRadios = HbnbSearchForm.self.querySelectorAll(".destination >.choice input[type='radio']");
        for (let elem of destRadios) {
            elem.addEventListener("change", function(e) {
                hbnb.form.request.destination = e.target.value;
            });
        }

        let amenRadios = HbnbSearchForm.self.querySelectorAll(".amenities >.choice input[type='radio']");
        for (let elem of amenRadios) {
            elem.addEventListener("change", function(e) {
                hbnb.form.request.amenities = e.target.value;

                let state = (e.target.value == 'specific') ? "show" : "hide"
                HbnbAmenities.setMenuVisibility(state);
                HbnbAmenities.setCounterVisibility(state);
            });
        }

        // Let's keep an eye out for the custom events that will be sent from hbnb-amenities.
        HbnbSearchForm.self.addEventListener("amenities_menu_button_clicked", function (e) {
            if (!amenRadios[1].checked) {
                amenRadios[1].click();
            }
            // In case you're wondering, yes the 'click' above will result in the 'change'
            // event triggering again. But this is ok. I'm only setting the menu state
            // to 'show' (even when it's already 'show') and not triggering any other events.
        });

        // Set up the Search button
        let formSubmitButton = HbnbSearchForm.self.querySelector("#btn-menu-search");
        formSubmitButton.addEventListener("click", function() {
            HbnbSearchForm.#submit();
        })
    }

    // So you can see that things are very messy when passing attribute values into the components.
    // Things would get messier if we had to pass in 5 or 6 or 7 attributes!
    // What if there were a cleaner way to pass the data into the hbnb-radio components?
    // Don't forget! There's still that hbnb 'global scope' object that we declared in index.html!
    // Maybe we could do more with it?
    // Be careful though, this would make the component tightly coupled with the global data...

    // For example...
    // if (!hbnb.form) {
    //     hbnb.form = {
    //         destRadios: {
    //             "All": {
    //                 name: "destination-radio-group",
    //                 value: "",
    //                 checked: "checked"
    //             },
    //             "Singapore": {
    //                 name: "destination-radio-group",
    //                 value: "SG",
    //                 checked: ""
    //             },
    //             ...
    //         },
    //         amenRadios: {
    //             ...
    //         },
    //     }
    // }

}

window.customElements.define('hbnb-search-form', HbnbSearchForm);