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
        // const mod = mods.find(mod => mod.id === this.queryMod);
        // if (mod) {
        //     this.#loadMod(mod);
        //     return;
        // }

        // const pack = packs.find(pack => pack.id === this.queryPack);
        // if (pack) {
        //     this.#loadPack(pack);
        //     return;
        // }

        this.#loadCards();
    }

    async #loadCards() {
        const html = await Controller.#getContentHTML('cards.html');

        for (let i = 0; i < 10; ++i) {
            const cardTemplate = html.querySelector('#card').content.cloneNode(true);
            html.querySelector('#mods ul').appendChild(cardTemplate);
        }

        // testing code
        for (let i = 0; i < 10; ++i) {
            const cardTemplate = html.querySelector('#card').content.cloneNode(true);
            html.querySelector('#packs ul').appendChild(cardTemplate);
        }
        
        // for (const mod of mods) {
        //     const cardTemplate = html.querySelector('#card').content.cloneNode(true);
        //     cardTemplate.querySelector('a').href = `?mod=${mod.id}`;
        //     cardTemplate.querySelector('.card-title').textContent = mod.title;
        //     cardTemplate.querySelector('.card-text').textContent = mod.description;
        //     html.querySelector('#mods').append(cardTemplate);
        // }

        // for (const pack of packs) {
        //     const cardTemplate = html.querySelector('#card').content.cloneNode(true);
        //     cardTemplate.querySelector('a').href = `?pack=${pack.id}`;
        //     cardTemplate.querySelector('.card-title').textContent = pack.title;
        //     cardTemplate.querySelector('.card-text').textContent = pack.description;
        //     html.querySelector('#packs').append(cardTemplate);
        // }

        this.main.innerHTML = html.innerHTML;
    }

    // async #loadMod(mod) {
    //     const html = await Controller.#getContentHTML('mods/mod-template.html');

    //     html.querySelector('#title').textContent = mod.title;
    //     html.querySelector('#description').textContent = mod.description;
        
    //     for (const note of mod.notes) {
    //         const li = document.createElement('li');
    //         li.textContent = note;
    //         html.querySelector('#notes').append(li);
    //     }
        
    //     for (const image of mod.images) {
    //         const imageTemplate = html.querySelector('#image').content.cloneNode(true);
    //         imageTemplate.querySelector('img').src = `./img/mods/${image}`;
    //         imageTemplate.querySelector('img').alt = image;
    //         html.querySelector('#images').append(imageTemplate);
    //     }
        
    //     this.main.innerHTML = html.innerHTML;
    // }

    // async #loadPack(pack) {
    //     const html = await Controller.#getContentHTML(`packs/${pack.id}.html`);

    //     this.main.innerHTML = html.innerHTML;
    // }

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
