import mods from './mods.js';
import packs from './packs.js';


class Controller {

    async loadCards() {
        const html = await Controller.#getContentHtml('cards.html');

        for (const mod of mods) {
            const cardTemplate = html.querySelector('#card-template').content.cloneNode(true);
            this.#fillCard(cardTemplate, mod, 'mod');
            html.querySelector('#mods ul').append(cardTemplate);
        }

        for (const pack of packs) {
            const cardTemplate = html.querySelector('#card-template').content.cloneNode(true);
            this.#fillCard(cardTemplate, pack, 'pack');
            html.querySelector('#packs ul').append(cardTemplate);
        }

        document.querySelector('main').innerHTML = html.innerHTML;
    }

    async loadItem(item, itemType) {
        const html = await Controller.#getContentHtml('item.html');

        this.#fillItem(html, item, itemType);

        document.querySelector('main').innerHTML = html.innerHTML;
    }

    #fillCard(cardTemplate, item, itemType) {
        cardTemplate.querySelector('a').href = `?${itemType}=${item.id}`;
        cardTemplate.querySelector('.card-title').innerText = item.title;
        cardTemplate.querySelector('.card-text').innerText = item.description;
    }

    #fillItem(html, item, itemType) {
        html.querySelector('#title').innerText = item.title;
        html.querySelector('#description').innerText = item.description;

        html.querySelectorAll(`[data-item-type="${itemType}"]`).forEach((element) => {
            element.hidden = false;
        });

        for (const download of item.downloads) {
            const downloadTemplate = html.querySelector('#download-template').content.cloneNode(true);
            downloadTemplate.querySelector('a').href = `./downloads/${itemType}s/${download.name ?? item.id}/${download.version}.zip`;
            downloadTemplate.querySelector('a').download = `${download.name ?? item.id}-${download.version}.zip`;
            downloadTemplate.querySelectorAll('td')[1].innerText = download.version;
            downloadTemplate.querySelectorAll('td')[2].innerText = download.hash;
            html.querySelector('#downloads tbody').append(downloadTemplate);
        }

        for (const image of item.images) {
            const imageTemplate = html.querySelector('#image-template').content.cloneNode(true);
            imageTemplate.querySelector('.figure-img').src = `./img/${itemType}s/${item.id}/${image.name}`;
            imageTemplate.querySelector('.figure-img').alt = image.name;
            imageTemplate.querySelector('.figure-caption').innerText = image.description;
            html.querySelector('#images ul').append(imageTemplate);
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
    const pack = packs.find(pack => pack.id === searchParams.get('pack'));

    if (mod) {
        controller.loadItem(mod, 'mod');
        return;
    }

    if (pack) {
        controller.loadItem(pack, 'pack');
        return;
    }

    controller.loadCards();
})();
