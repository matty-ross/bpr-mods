import Cards from './cards.js';
import Item from './item.js';

import mods from '../data/mods.js';
import packs from '../data/packs.js';


class Controller {
    #main = null;
    #urlSearchParams = null;
    
    constructor() {
        this.#main = document.querySelector('main');
        this.#urlSearchParams = new URLSearchParams(location.search);
    }

    async load() {
        const mod = mods.find(mod => mod.id === this.#urlSearchParams.get('mod'));
        if (mod) {
            this.#main.innerHTML = new Item(
                await Controller.#getContentHtml('item.html'),
                mod,
                'mod',
            ).render();
            return;
        }
        
        const pack = packs.find(pack => pack.id === this.#urlSearchParams.get('pack'));
        if (pack) {
            this.#main.innerHTML = new Item(
                await Controller.#getContentHtml('item.html'),
                pack,
                'pack',
            ).render();
            return;
        }

        this.#main.innerHTML = new Cards(
            await Controller.#getContentHtml('cards.html'),
            mods,
            packs,
        ).render();
    }
    
    static async #getContentHtml(path) {
        const response = await fetch(`./content/${path}`);
        const html = await response.text();
        
        const parser = new DOMParser();
        return parser.parseFromString(html, 'text/html').body;
    }
}


(() => {
    const controller = new Controller();
    controller.load();
})();
