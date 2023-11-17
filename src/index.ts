import * as components from "./components/export";
import "./components/export"
import "./screens/Cart"
import "./screens/upload"
import { addObserver, appState } from "./store/index";
import { screens } from "./types/navigation";


class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        addObserver(this)
    }

    connectedCallback() {
        this.render()
    }

    render() {
        if (this.shadowRoot) {
            switch (appState.screen) {

                case screens.NEW_POST:
                    this.shadowRoot.innerHTML = ``
                    const post = this.ownerDocument.createElement("upload-container")
                    this.shadowRoot?.appendChild(post)
                break;

                case screens.CART:
                    this.shadowRoot.innerHTML = ``
                    const profile1 = this.ownerDocument.createElement("app-cart")
                    this.shadowRoot?.appendChild(profile1)
                break;
            }
        }

    }
}

customElements.define("app-container", AppContainer)
export default AppContainer;