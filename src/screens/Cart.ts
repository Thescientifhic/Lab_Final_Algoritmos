import "../components/export"
import { getDataProducts } from "../utils/firebase";
import { AttributeProducts } from "../components/uploadcart/cart";
import firebase from "../utils/firebase";
import { navigate } from "../store/actions";
import { addObserver, dispatch } from "../store/index";
import { screens } from "../types/navigation";


export class Cart extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        this.render();
    }


async render() {

    try {

        const dataProducts = await getDataProducts();
        console.log(dataProducts);

        if (this.shadowRoot) {
            console.log("My Profile")
          this.shadowRoot.innerHTML = '';

            const link = this.ownerDocument.createElement("link")
            link.setAttribute("rel", "stylesheet")
            link.setAttribute("href", "/src/screens/Cart.css")
            this.shadowRoot.appendChild(link);

             dataProducts.forEach((product) => {
              const dataCartProducts = this.ownerDocument.createElement("my-cart");
              dataCartProducts.setAttribute(AttributeProducts.img, product.img);
              dataCartProducts.setAttribute(AttributeProducts.name, product.name);
              dataCartProducts.setAttribute(AttributeProducts.price, product.price);
              dataCartProducts.setAttribute(AttributeProducts.quantity, product.quantity);
              this.shadowRoot?.appendChild(dataCartProducts);
             })

             const btnAddProduct = this.ownerDocument.createElement("button")
            btnAddProduct.innerHTML = "Go to add product"
            btnAddProduct.setAttribute("class", "btn")
            btnAddProduct.addEventListener("click", () => {
                console.log("click cart")
                dispatch(navigate(screens.NEW_POST))
            })

            this.shadowRoot?.appendChild(btnAddProduct);

        }
    }

     catch (error) {
        console.error("Error al cargar datos de Firebase:", error);
        }
    }
}


customElements.define("app-cart", Cart)
