import mods from './mods.js'
import packs from './packs.js'


class Controller {
    constructor() {
        this.main = document.querySelector('main');
        
        const searchParams = new URLSearchParams(location.search);
        this.queryMod = searchParams.get('mod');
        this.queryPack = searchParams.get('pack');
    }

    route() {
        const mod = mods.find(mod => mod.id === this.queryMod);
        if (mod) {
            this.#loadMod(mod);
            return;
        }

        const pack = packs.find(pack => pack.id === this.queryPack);
        if (pack) {
            this.#loadPack(pack);
            return;
        }

        this.#loadCards();
    }

    async #loadCards() {
        const html = await Controller.#getContentHTML('cards.html');

        for (const mod of mods) {
            const cardTemplate = html.querySelector('#card').content.cloneNode(true);
            
            cardTemplate.querySelector('a').href = `?mod=${mod.id}`;
            cardTemplate.querySelector('.card-title').innerText = mod.title;
            cardTemplate.querySelector('.card-text').innerHTML = mod.description;

            html.querySelector('#mods ul').appendChild(cardTemplate);
        }

        for (const pack of packs) {
            const cardTemplate = html.querySelector('#card').content.cloneNode(true);
            
            cardTemplate.querySelector('a').href = `?pack=${pack.id}`;
            cardTemplate.querySelector('.card-title').innerText = pack.title;
            cardTemplate.querySelector('.card-text').innerHTML = pack.description;
            
            html.querySelector('#packs ul').appendChild(cardTemplate);
        }

        this.main.innerHTML = html.innerHTML;
    }

    async #loadMod(mod) {
        const html = await Controller.#getContentHTML('item.html');

        html.querySelector('#title').innerText = mod.title;
        html.querySelector('#description').innerText = mod.description;
        
        for (const note of mod.notes) {
            const li = document.createElement('li');
            li.innerText = note;
            html.querySelector('#notes ul').append(li);
        }
        
        this.main.innerHTML = html.innerHTML;
    }

    async #loadPack(pack) {
        const html = await Controller.#getContentHTML('item.html');

        html.querySelector('#title').innerText = pack.title;
        html.querySelector('#description').innerText = pack.description;

        for (const note of pack.notes) {
            const li = document.createElement('li');
            li.innerText = note;
            html.querySelector('#notes ul').append(li);
        }

        this.main.innerHTML = html.innerHTML;
    }

    static async #getContentHTML(path) {
        const response = await fetch(`./content/${path}`);
        const html = await response.text();
        
        const parser = new DOMParser();
        return parser.parseFromString(html, 'text/html').body;
    }
}


(() => {
    const controller = new Controller();
    controller.route();
})();
