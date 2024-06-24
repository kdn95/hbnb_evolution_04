export class HbnbSearchResults extends HTMLElement {
    static self;

    constructor() {
      super();
    }

    // connect component
    connectedCallback() {
        // store a ref to the component
        HbnbSearchResults.self = this;

        this.innerHTML = `
            <div id="results">
                <div class="none">
                    <h1>Please run the Search above to find available properties!</h1>
                </div>
            </div>
        `;
    }

    static renderResults() {
        HbnbSearchResults.self.innerHTML = `
            <h1>Hello World</h1>
        `;
    }
}

window.customElements.define('hbnb-search-results', HbnbSearchResults);