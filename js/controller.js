import mods from './mods.js'
import packs from './packs.js'


class Controller {

    async loadCards() {
        const html = await Controller.#getContentHtml('cards.html');

        for (const mod of mods) {
            const cardTemplate = html.querySelector('#card-template').content.cloneNode(true);
            this.#fillCard(cardTemplate, mod, 'mod');
            html.querySelector('#mods ul').appendChild(cardTemplate);
        }

        for (const pack of packs) {
            const cardTemplate = html.querySelector('#card-template').content.cloneNode(true);
            this.#fillCard(cardTemplate, pack, 'pack');
            html.querySelector('#packs ul').appendChild(cardTemplate);
        }

        document.querySelector('main').innerHTML = html.innerHTML;
    }

    async loadMod(mod) {
        const html = await Controller.#getContentHtml('item.html');

        this.#fillItem(html, mod, 'mods');
        if (mod.extraContent) {
            const extraHtml = await Controller.#getContentHtml(`mods/${mod.id}.html`);
            html.append(extraHtml);
        }
        
        document.querySelector('main').innerHTML = html.innerHTML;
    }

    async loadPack(pack) {
        const html = await Controller.#getContentHtml('item.html');

        this.#fillItem(html, pack, 'packs');
        if (pack.extraContent) {
            const extraHtml = await Controller.#getContentHtml(`packs/${pack.id}.html`);
            html.append(extraHtml);
        }

        document.querySelector('main').innerHTML = html.innerHTML;
    }

    #fillCard(cardTemplate, item, query) {
        cardTemplate.querySelector('a').href = `?${query}=${item.id}`;
        cardTemplate.querySelector('.card-title').innerText = item.title;
        cardTemplate.querySelector('.card-text').innerText = item.description;
    }

    #fillItem(html, item, folder) {
        html.querySelector('#title').innerText = item.title;
        html.querySelector('#description').innerText = item.description;
        
        for (const note of item.notes) {
            const noteTemplate = html.querySelector('#note-template').content.cloneNode(true);
            noteTemplate.querySelector('li').innerText = note;
            html.querySelector('#notes ul').append(noteTemplate);
        }

        for (const download of item.downloads) {
            const downloadTemplate = html.querySelector('#download-template').content.cloneNode(true);
            downloadTemplate.querySelector('a').href = `./downloads/${folder}/${download.name ?? item.id}/${download.version}.zip`;
            downloadTemplate.querySelector('a').download = `${download.name ?? item.id}-${download.version}.zip`;
            downloadTemplate.querySelectorAll('td')[1].innerText = download.version;
            downloadTemplate.querySelectorAll('td')[2].innerText = download.hash;
            html.querySelector('#downloads tbody').append(downloadTemplate);
        }

        for (const image of item.images) {
            const imageTemplate = html.querySelector('#image-template').content.cloneNode(true);
            imageTemplate.querySelector('.figure-img').src = `./img/${folder}/${item.id}/${image.name}`;
            imageTemplate.querySelector('.figure-img').alt = image.name;
            imageTemplate.querySelector('.figure-caption').innerText = image.description;
            html.querySelector('#gallery ul').append(imageTemplate);
        }
    }

    static async #getContentHtml(path) {
        const parser = new DOMParser();
        const html = await (await fetch(`./content/${path}`)).text();
        return parser.parseFromString(html, 'text/html').body;
    }
}


(() => {
    const controller = new Controller();
    
    const searchParams = new URLSearchParams(location.search);
    
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
