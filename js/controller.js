import mods from './mods.js'
import packs from './packs.js'


class Controller {

    async loadCards() {
        const html = await Controller.#getContentHTML('cards.html');

        for (const mod of mods) {
            const cardTemplate = html.querySelector('#card').content.cloneNode(true);
            this.#fillCard(cardTemplate, mod, 'mod');
            html.querySelector('#mods ul').appendChild(cardTemplate);
        }

        for (const pack of packs) {
            const cardTemplate = html.querySelector('#card').content.cloneNode(true);
            this.#fillCard(cardTemplate, pack, 'pack');
            html.querySelector('#packs ul').appendChild(cardTemplate);
        }

        document.querySelector('main').innerHTML = html.innerHTML;
    }

    async loadMod(mod) {
        const html = await Controller.#getContentHTML('item.html');

        this.#fillItem(html, mod);
        
        document.querySelector('main').innerHTML = html.innerHTML;
    }

    async loadPack(pack) {
        const html = await Controller.#getContentHTML('item.html');

        this.#fillItem(html, pack);

        document.querySelector('main').innerHTML = html.innerHTML;
    }

    #fillCard(cardTemplate, item, query) {
        cardTemplate.querySelector('a').href = `?${query}=${item.id}`;
        cardTemplate.querySelector('.card-title').innerText = item.title;
        cardTemplate.querySelector('.card-text').innerHTML = item.description;
    }

    #fillItem(html, item) {
        html.querySelector('#title').innerText = item.title;
        html.querySelector('#description').innerText = item.description;
        
        for (const note of item.notes) {
            const li = document.createElement('li');
            li.innerText = note;
            html.querySelector('#notes ul').append(li);
        }
    }

    static async #getContentHTML(path) {
        const response = await fetch(`./content/${path}`);
        const html = await response.text();
        
        const parser = new DOMParser();
        return parser.parseFromString(html, 'text/html').body;
    }
}


(() => {
    const searchParams = new URLSearchParams(location.search);
    const controller = new Controller();
    
    const mod = mods.find(mod => mod.id === searchParams.get('mod'));
    if (mod) {
        controller.loadMod(mod);
        return;        
    }

    const pack = packs.find(pack => pack.id === searchParams.get('pack'));
    if (pack) {
        controller.loadPack(pack);
        return;
    }

    controller.loadCards();
})();
