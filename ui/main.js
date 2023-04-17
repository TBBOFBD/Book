(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TBBOFBD = {}));
})(this, (function (exports) {'use strict';

    const uuid = () => {
        return crypto.randomUUID()
    };exports.uuid = uuid;

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
            code.style.overflow = "hidden";
            elem.appendChild(code);
            elem.style.overflow = "hidden";
            document.body.appendChild(elem);
        }
    });

    const ALLOWED_LANGS = [
        "clike", "c", "cpp", "css",
        "dart", "docker",
        "go", "go-mod", "gradle", "groovy",
        "handlebars", "haskell", "http",
        "javascript", "java", "javadoclike", "javadoc", "javastacktrace", "jsdoc", "json", "json5", "jsonp", "jsstacktrace", "jsx",
        "linker-script",
        "markup", "markup-templating", "makefile", "markdown",
        "python",
        "ruby", "rust",
        "toml", "typescript", "ts", "tsx",
        "yaml", "yml",
    ];

    /**
     * ## `genCodeBlock`
     * @param {string} code code to be displayed
     * @param {"clike"|"c"|"cpp"|"css"|
     * "dart"|"docker"|
     * "go"|"go-mod"|"gradle"|"groovy"|
     * "handlebars"|"haskell"|"http"|
     * "javascript"|"java"|"javadoclike"|"javadoc"|"javastacktrace"|"jsdoc"|"json"|"json5"|"jsonp"|"jsstacktrace"|"jsx"|
     * "linker-script"|
     * "markup"|"markup-templating"|"makefile"|"markdown"|
     * "python"|
     * "ruby"|"rust"|
     * "toml"|"typescript"|"ts"|"tsx"|
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