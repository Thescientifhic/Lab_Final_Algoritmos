import firebase from "../../utils/firebase";
import { addPost } from "../../utils/firebase";
import { navigate } from "../../store/actions";
import { addObserver, dispatch } from "../../store/index";
import { screens } from "../../types/navigation";

export enum AttributeUpload {
    "img" = "img",
    "btn" = "btn",
}

const formPost = {
    img: "",
    name: "",
    price: 0,
    quantity: 0,
};

export default class Upload extends HTMLElement {
    img?: string;
    btn?: string;
    static productCount = 0;

    static get observedAttributes() {
        const attrs: Record<AttributeUpload, null> = {
            img: null,
            btn: null,
        };
        return Object.keys(attrs);
    }

    attributeChangedCallback(
        propName: AttributeUpload,
        _: unknown,
        newValue: string
    ) {
        switch (propName) {
            default:
                this[propName] = newValue;
                break;
        }
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    imgProducts(e: any) {
        formPost.img = e.target.value;
    }

    nameProducts(e: any) {
        formPost.name = e.target.value;
    }

    priceProducts(e: any) {
        const priceValue = parseFloat(e.target.value);
        formPost.price = isNaN(priceValue) ? 0 : priceValue; // Si no se puede convertir, se asigna 0
    }

    quantityProducts(e: any) {
        const quantityValue = parseInt(e.target.value);
        formPost.quantity = isNaN(quantityValue) ? 0 : quantityValue; // Si no se puede convertir, se asigna 0
    }

    clearFormFields() {
        const img_link = this.shadowRoot?.querySelector(
            'input[placeholder="Url image"]'
        ) as HTMLInputElement;
        const name_product = this.shadowRoot?.querySelector(
            'input[placeholder="Product name"]'
        ) as HTMLInputElement;
        const price = this.shadowRoot?.querySelector(
            'input[placeholder="price"]'
        ) as HTMLInputElement;
        const quantity = this.shadowRoot?.querySelector(
            'input[placeholder="Quantity"]'
        ) as HTMLInputElement;

        if (img_link) img_link.value = "";
        if (name_product) name_product.value = "";
        if (price) price.value = "";
        if (quantity) quantity.value = "";
    }

    submitForm() {
        // Verificar si los campos obligatorios están vacíos
        if (formPost.img.trim() === '' || formPost.name.trim() === '' || formPost.price === 0 || formPost.quantity === 0) {
            console.log('Por favor, complete todos los campos');
            alert('Por favor, complete todos los campos');
            return; // Detener el envío del formulario si algún campo está vacío
        }
        addPost(formPost); // Llama a addPost solo si todos los campos requeridos tienen valores
        this.clearFormFields();
    }

    render() {
        if (this.shadowRoot) this.shadowRoot.innerHTML = "";

        const link = this.ownerDocument.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "/src/components/uploadd/upload.css");
        this.shadowRoot?.appendChild(link);

        const section = this.ownerDocument.createElement("section");

        const h1_Element = this.ownerDocument.createElement("h1");
        h1_Element.innerText = "Add a product to cart";
        section.appendChild(h1_Element);

        const line = this.ownerDocument.createElement("hr");
        section.appendChild(line);

        const loginForm = this.ownerDocument.createElement("form");
        loginForm.classList.add("form");
        section.appendChild(loginForm);

        const img_link = this.ownerDocument.createElement("input");
        img_link.setAttribute("type", "text");
        img_link.setAttribute("placeholder", "Url image");
        img_link.addEventListener("change", this.imgProducts);
        img_link.classList.add("inpuut");
        loginForm.appendChild(img_link);

        const name_product = this.ownerDocument.createElement("input");
        name_product.setAttribute("type", "text");
        name_product.setAttribute("placeholder", "Product name");
        name_product.addEventListener("change", this.nameProducts);
        name_product.classList.add("inpuut");
        loginForm.appendChild(name_product);

        const price = this.ownerDocument.createElement("input");
        price.setAttribute("type", "number");
        price.setAttribute("placeholder", "price");
        price.addEventListener("change", this.priceProducts);
        price.classList.add("inpuut");
        loginForm.appendChild(price);

        const quantity = this.ownerDocument.createElement("input");
        quantity.setAttribute("type", "number");
        quantity.setAttribute("placeholder", "Quantity");
        quantity.addEventListener("change", this.quantityProducts);
        quantity.classList.add("inpuut");
        loginForm.appendChild(quantity);

        const upload_button = this.ownerDocument.createElement("button");
        upload_button.innerText = `upload your picture`;
        upload_button.addEventListener("click", this.submitForm.bind(this)); // Bind the function to maintain the context
        upload_button.classList.add("green-button");
        section.appendChild(upload_button);

        const change_screen = this.ownerDocument.createElement("button");
        change_screen.innerText = `GO to cart`;
        change_screen.classList.add("green-button");
        section.appendChild(change_screen);
        change_screen.addEventListener("click", () => {
            console.log("click cart");
            dispatch(navigate(screens.CART));
        });
        this.shadowRoot?.appendChild(section);
    }
}

customElements.define("app-upload", Upload);
