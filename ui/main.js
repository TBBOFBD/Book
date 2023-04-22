(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TBBOFBD = {}));
})(this, (function (exports) {
    'use strict';

    const uuid = () => {
        return "STYLE-" + crypto.randomUUID();
    }; exports.uuid = uuid;

    customElements.define('text-quote', class extends HTMLElement {
        constructor() {
            super();
            const root = this.attachShadow({ mode: 'open' });
            const styles = [
                "font-style: italic",
                "color: rgb(33, 62, 192)"
            ]
            this.__ROOT = root;
            this.__STYLES = styles;
        }
        connectedCallback() {
            let text = this.getAttribute('quote')
            if (!text) text = "Lorem Ipsum"
            const elem = document.createElement('kbd');
            elem.style.cssText = this.__STYLES.join(';');
            elem.innerHTML = text;
            this.__ROOT.appendChild(elem);
        }
    });
    customElements.define('code-block', class extends HTMLElement {
        constructor() {
            super();
            const ID = uuid();
            this.__ID = ID;
            const style = document.createElement('style');
            //? Hide Scrollbar
            // style.innerHTML = `
            // .${ID}::-webkit-scrollbar {
            //     display: none;
            // }
            // .${ID} {
            //     -ms-overflow-style: none;
            //     scrollbar-width: none;
            // }`;
            style.innerHTML = `
            .${ID}::-webkit-scrollbar {
                width: 1em;
            }

            .${ID}::-webkit-scrollbar-track {
                -webkit-border-radius: 10px;
                border-radius: 10px;
            }
            
            .${ID}::-webkit-scrollbar-thumb {
                -webkit-border-radius: 10px;
                border-radius: 10px;
                background-color: var(--scrollbar-color);
                outline: 1px solid var(--scrollbar-color);
            }
            `;
            document.head.appendChild(style);
        }
        connectedCallback() {
            let text = this.getAttribute('code')
            if (!text) text = "Lorem Ipsum"
            let lang = this.getAttribute('lang')
            if (!lang) lang = "plaintext"
            const elem = document.createElement('pre');
            const code = document.createElement('code');
            code.className = `language-${lang}`;
            code.innerHTML = text;
            elem.setAttribute('class', this.__ID);
            elem.appendChild(code);
            document.body.appendChild(elem);
        }
    });

    class Note extends HTMLElement {
        constructor(type) {
            super();
            const root = this.attachShadow({ mode: 'open' });
            const COLORS = {
                Info: "rgba(42, 201, 98, 0.5)",
                Warning: "rgba(249, 62, 62, 0.5)",
                Hint: "#rgba(44, 194, 232, 0.5)"
            };
            this.__TYPE = type;
            this.__ROOT = root;
            this.__COLOR = COLORS[type] || "#000";
        }
        onConnect(data, alignment) {
            const elem = document.createElement('div');
            elem.setAttribute('align', 'left');
            elem.style.cssText = `background-color: ${this.__COLOR};border-radius: 10px;padding: 10px;`;
            const title = document.createElement('h2');
            title.style.position = "relative";
            title.style.top = "-20px";
            title.style.left = "5px";
            title.innerText = this.__TYPE;
            elem.appendChild(title);
            const contentContainer = document.createElement('div');
            contentContainer.setAttribute('align', alignment);
            const content = document.createElement('span');
            content.innerHTML = data;
            contentContainer.appendChild(content);
            elem.appendChild(contentContainer);
            this.__ROOT.appendChild(elem);
        }
    }

    class NoteInfo extends Note {
        constructor() {
            super("Info");
        }
        connectedCallback() {
            const data = this.getAttribute('data') || "Lorem Ipsum";
            const alignment = this.getAttribute('alignment') || "center";
            super.onConnect(data, alignment);
        }
    }

    class NoteWarning extends Note {
        constructor() {
            super("Warning");
        }
        connectedCallback() {
            const data = this.getAttribute('data') || "Lorem Ipsum";
            const alignment = this.getAttribute('alignment') || "center";
            super.onConnect(data, alignment);
        }
    }

    class NoteHint extends Note {
        constructor() {
            super("Hint");
        }
        connectedCallback() {
            const data = this.getAttribute('data') || "Lorem Ipsum";
            const alignment = this.getAttribute('alignment') || "center";
            super.onConnect(data, alignment);
        }
    }

    customElements.define('note-info', NoteInfo);
    customElements.define('note-warning', NoteWarning);
    customElements.define('note-hint', NoteHint);

    const ALLOWED_LANGS = [
        "clike", "c", "cpp", "css",
        "dart", "docker",
        "go", "go-mod", "gradle", "groovy",
        "handlebars", "haskell", "http", "html",
        "javascript", "java", "javadoclike", "javadoc", "javastacktrace", "jsdoc", "json", "json5", "jsonp", "jsstacktrace", "jsx",
        "linker-script",
        "markup", "markup-templating", "makefile", "markdown", "mathml",
        "python",
        "ruby", "rust",
        "svg",
        "toml", "typescript", "ts", "tsx",
        "xml",
        "yaml", "yml",
    ];

    /**
     * ## `genCodeBlock`
     * @param {string} code code to be displayed
     * @param {"clike"|"c"|"cpp"|"css"|
     * "dart"|"docker"|
     * "go"|"go-mod"|"gradle"|"groovy"|
     * "handlebars"|"haskell"|"http"|"html"|
     * "javascript"|"java"|"javadoclike"|"javadoc"|"javastacktrace"|"jsdoc"|"json"|"json5"|"jsonp"|"jsstacktrace"|"jsx"|
     * "linker-script"|
     * "markup"|"markup-templating"|"makefile"|"markdown"|"mathml"
     * "python"|
     * "ruby"|"rust"|
     * "svg"|
     * "toml"|"typescript"|"ts"|"tsx"|
     * "xml"|
     * "yaml"|"yml"} lang code language
     * 
     * EXAMPLE:
     * ```html
     * <script>TBBOFBD.genCodeBlock(`const variable = "Heres some JavaScript";console.log(variable);`, "javascript");</script>
     * ```
    */
    const genCodeBlock = (code, lang) => {
        if (!ALLOWED_LANGS.includes(lang)) return console.error(`Language "${lang}" is not supported.`);
        const elem = document.createElement('code-block');
        elem.setAttribute('code', code);
        elem.setAttribute('lang', lang);
        document.body.appendChild(elem);
    }; exports.genCodeBlock = genCodeBlock;
}));