export enum AttributeProducts {
    "img" = "img",
    "name" = "name",
    "price" = "price",
    "quantity" = "quantity",

}


export class Feed extends HTMLElement {

    img?: string;
    name?: string;
    price?: string;
    quantity?: string;


    static get observedAttributes(){
        const attrs: Record <AttributeProducts, null> ={

            img: null,
            name: null,
            price: null,
            quantity: null,

        }
        return Object.keys(attrs);
    }

    attributeChangedCallback(
        propName: AttributeProducts,
        _: unknown,
        newValue: string){

            switch (propName) {
                default:
                    this[propName] = newValue;
                    break;
            }
    }

    constructor(){
        super();
        this.attachShadow({mode: 'open'})
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){

            const link = this.ownerDocument.createElement("link")
            link.setAttribute("rel", "stylesheet")
            link.setAttribute("href", "/src/components/uploadcart/cart.css")
            this.shadowRoot.appendChild(link);

            const sectionContainer = this.ownerDocument.createElement("section")
            this.shadowRoot.appendChild(sectionContainer);


            const user = this.ownerDocument.createElement("img")
            user.setAttribute("src", `${this.img}`)
            user.setAttribute("class", "img")
            sectionContainer.appendChild(user)

            const nameProduct = this.ownerDocument.createElement("h1");
            const productName = "Product: "; // Enunciado antes del nombre del producto
            nameProduct.innerText = `${productName}${this.name}`;
            nameProduct.classList.add("name"); // Agregando una clase si es necesario
            sectionContainer.appendChild(nameProduct);


            const price = this.ownerDocument.createElement("p")
            const productPrice = "Price: $";
            price.innerText = `${productPrice}${this.price}`
            sectionContainer.appendChild(price)

            const quantity = this.ownerDocument.createElement("p")
            const productQuantity = "Quantity: ";
            quantity.innerText = `${productQuantity}${this.quantity}`
            sectionContainer.appendChild(quantity)

        }
    }
}

customElements.define("my-cart",Feed);
