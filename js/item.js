export default class {
    #itemHtml = null;
    #item = null;
    #itemType = null;

    constructor(itemHtml, item, itemType) {
        this.#itemHtml = itemHtml;
        this.#item = item;
        this.#itemType = itemType;
    }

    render() {
        this.#fillItem();
        
        return this.#itemHtml.innerHTML;
    }

    #fillItem() {
        this.#itemHtml.querySelector('#title').innerText = this.#item.title;
        this.#itemHtml.querySelector('#description').innerText = this.#item.description;
        
        this.#itemHtml.querySelectorAll(`[data-item-type="${this.#itemType}"]`).forEach(element => element.hidden = false);
    }
}
