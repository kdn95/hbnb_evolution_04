import { HbnbRadio } from "./radio.js"
import { HbnbAmenities } from "./amenities.js"
import { HbnbSearchResults } from "./search-results.js"

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
            <section class="section-hero">
                <h2 class="hero-title">Book the best hotel for your perfect getaway</h2>
                <h6 class="hero-para">Welcome to the HBnB accommodation booking site. Explore and book accommodation in a variety of different locations. Find your perfect stay with our amenity filters - It's that easy!</h6>
            </section>
            <div class="none">
                <h1>Start searching!</h1>
            </div>
            <div class="contents">
                <div class="destination">
                    <div class="title">Destination</div>
                    <div class="choice">`
                        + destRadiosHtml +
                    `</div>
                </div>
            </div>
            <div class="contents">
                <div class="amenities">
                    <div class="title">Amenities</div>
                    <div class="choice">`
                        + amenRadiosHtml +
                        `<hbnb-amenities></hbnb-amenities>
                    </div>
                </div>
            </div>
            <div class="contents">
                <div class="search">
                    <button id="btn-menu-search" type="submit">Search
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>
        `;

        HbnbSearchForm.#init();
    }


    // --- Private Methods ---
// declare private(#) static method
    static #createDestinationRadios() {
        // check if hbnb.searched & .searched.dest are both not null/undefined, if true, set to .serached.dest else None
        let searchedDest = (hbnb.searched && hbnb.searched.dest) ? hbnb.searched.dest : "";
        let destGroupName = "destination-radio-group";
        let destRadiosHtml = ``;

        // First option - 'All'
        // if searchedDest is None, make that 'checked' to a isDestChecked variable name
        let isDestChecked = (searchedDest == "") ? "checked" : "";
        // destRadioHtml becomes the "all" radio button that includes dest-radio-group, the value being 'all' and the searchedDest being checked
        destRadiosHtml += `<hbnb-radio name="` + destGroupName + `" value="" label="All" ` + isDestChecked + `></hbnb-radio>`;

        // The other options
        for (let countryCode in hbnb.destinations) {
            // if searchedDest is the same as countryCode, make it checked and assigned isDestChecked
            isDestChecked = (searchedDest == countryCode) ? "checked" : "";
            // countryName assigned to hbnb.destinations[countryCode]
            let countryName = hbnb.destinations[countryCode];
            // destRadioHtml becomes checked destination button where value is equal to countryCode, with countryName as label and confirmed to be checked
            destRadiosHtml += `<hbnb-radio name="` + destGroupName + `" value="` + countryCode + `" label="` + countryName + `" ` + isDestChecked + ` ></hbnb-radio>`;
        }

        return destRadiosHtml;
    }

    static #createAmenitiesRadios() {
        // searchedAmen will either be an empty string or an array of stuff
        // hbnb.searched & hbnb.searched.amen does not exist, hence automatically None
        let searchedAmen = (hbnb.searched && hbnb.searched.amen) ? hbnb.searched.amen : "";
        let amenGroupName = "amenities-radio-group";
        let amenRadiosHtml = ``;
        
        // Only two radios - 'All' or 'Specific'
        let isAmenAllChecked = (searchedAmen == "" || searchedAmen.length == 0) ? "checked" : "";
        let isAmenSpecificChecked = (isAmenAllChecked == "") ? "checked" : "";
        // amenRadiosHtml is equal to amenities-radio-group + no value being defaulted to be "All" as it is checked
        amenRadiosHtml += `<hbnb-radio name="` + amenGroupName + `" value="" label="All" ` + isAmenAllChecked + `></hbnb-radio>`;
        // amenRadiosHtml is equal to amenities-radio-group + value is specific as the specificAmen is checked
        amenRadiosHtml += `<hbnb-radio name="` + amenGroupName + `" value="specific" label="Specific" ` + isAmenSpecificChecked + `></hbnb-radio>`;

        return amenRadiosHtml;
    }

    // Example POST method implementation:
    // Send data to a server, such as submitting form data, sending user input, or communicating with an API
    // async it will exe one process and do another without delay
    // takes a string url and data object
    static async #postData(url = "", data = {}) {
        // return waits for function exec. until fetch API is resolved below
        // object includes key-value pair for method, headers with a value of an obj "content-Type"
        return await fetch(url, {
            // HTTP method specified to send data to server
            method: "POST",
            // header data is in JSON format (hence "application/json")
            headers: {
                "Content-Type": "application/json",
            },
            // data obj converted to JSON string and sent as request body
            body: JSON.stringify(data),
        });
    }

    static async #submit() {
        // Show the loader
        // Loader element changes class to "show"/"indicate" that background process (i.e. data submission) is happening.
        document.getElementById("loader").setAttribute('class', 'show');

        // the data we need to submit should already all be gathered in hbnb.form.request
        let submitData = hbnb.form.request;
        // console.log(submitData)

        // Wrap the Fetch API in a Promise...
        const myPromise = new Promise((resolve, reject) => {
            try {
                // calls the #postData method to send submitData to server.#postData expected to return a promise from the Fetch API.
                const response = HbnbSearchForm.#postData("/", submitData);
                // When response is received, then() extracts JSON data (i.e. result) and resolves promise
                response.then((result) => {
                    // result function is equal to resolve of JSON formatted of the result/response
                    resolve(result.json());
                })
                // if no response, catch() creates error 
            } catch(error) {
                // print error "Error"
                console.error("Error:", error);
                // And pushes to reject state with statement "something happened"
                reject('something happened');
            }
        });
        // if myPromise is successfully resolved, receives result from promise and the data
        myPromise.then((result) => {
            // Save the results into the global object
            // data from result is saved to global object hbnb.form.response
            hbnb.form.response = result.data;
            // Call the function for the results component to render the results
            HbnbSearchResults.renderResults();
        }).catch((e) => {
            // console.error(e)
            console.error('Something happened...');
        }).finally(() => {
            // Hide the loader
            document.getElementById("loader").setAttribute('class', 'hide');
        })
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