const uuid = () => { return crypto.randomUUID() }

class TextQuote extends HTMLElement {
    constructor() {
        super();
        const root = this.attachShadow({mode:'open'});
        const styles = [
            "font-style: italic",
            "color: rgb(33, 62, 192)"
        ]
        this.__ROOT = root;
        this.__STYLES = styles;
    }

    connectedCallback() {
        let text = this.getAttribute('quote')
        if(!text) text = "Lorem Ipsum"
        const elem = document.createElement('kbd');
        elem.style.cssText = this.__STYLES.join(';');
        elem.innerHTML = text;
        this.__ROOT.appendChild(elem);
    }
}

customElements.define('text-quote', TextQuote);