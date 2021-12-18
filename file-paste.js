class PasteFile {
    /**
     * @param {string|HTMLElement} selector
     */
    selector;
    overrideExisting;
    onPaste;

    /**
     *
     * @param selector:string|HTMLElement
     * @param options
     */
    constructor(selector, options = {}) {
        this.selector = selector;
        this.overrideExisting = options.overrideExisting ?? true;
        this.onPaste = options.onPaste;
        this.#init();
    }

    #init() {
        document.addEventListener('paste', (e) => {
            const fileInput = this.#getElement();
            if (!fileInput) {
                return;
            }
            if(fileInput.files.length > 0 && !this.overrideExisting) {
                return;
            }
            fileInput.files = e.clipboardData.files;
            fileInput.dispatchEvent(new Event('change'));
            e.preventDefault();
            e.stopImmediatePropagation();
            if(this.onPaste) {
                this.onPaste.call(null, fileInput);
            }
        });
    }

    #getElement() {
        if(typeof this.selector === 'string') return document.querySelector(this.selector);
        return this.selector;
    }
}