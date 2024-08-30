export default class {
    #cardsHtml = null;
    #mods = null;
    #packs = null;
    
    constructor(cardsHtml, mods, packs) {
        this.#cardsHtml = cardsHtml;
        this.#mods = mods;
        this.#packs = packs;
    }

    render() {
        for (const mod of this.#mods) {
            const cardHtml = this.#fillCard(mod, 'mod');
            this.#cardsHtml.querySelector('#mods ul').append(cardHtml);
        }
        
        for (const pack of this.#packs) {
            const cardHtml = this.#fillCard(pack, 'pack');
            this.#cardsHtml.querySelector('#packs ul').append(cardHtml);
        }

        return this.#cardsHtml.innerHTML;
    }

    #fillCard(item, itemType) {
        const cardHtml = this.#cardsHtml.querySelector('#card-template').content.cloneNode(true)

        cardHtml.querySelector('a').href = `?${itemType}=${item.id}`;
        cardHtml.querySelector('.card-header').innerText = itemType;
        cardHtml.querySelector('.card-title').innerText = item.title;
        cardHtml.querySelector('.card-text').innerText = item.description;

        return cardHtml;
    }
}
