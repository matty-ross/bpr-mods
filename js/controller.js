import mods from './mods.js';
import packs from './packs.js';


// ==== cards ====

async function loadCards() {
    const cardsHtml = await getContentHtml('cards.html');

    for (const mod of mods) {
        const cardHtml = createCardHtml(cardsHtml, mod, 'mod');
        cardsHtml.querySelector('#mods ul').append(cardHtml);
    }

    for (const pack of packs) {
        const cardHtml = createCardHtml(cardsHtml, pack, 'pack');
        cardsHtml.querySelector('#packs ul').append(cardHtml);
    }

    document.querySelector('main').innerHTML = cardsHtml.innerHTML;
}

function createCardHtml(cardsHtml, item, itemType) {
    const cardHtml = cardsHtml.querySelector('#card-template').content.cloneNode(true);

    cardHtml.querySelector('a').href = `?${itemType}=${item.id}`;
    cardHtml.querySelector('.card-title').innerText = item.title;
    cardHtml.querySelector('.card-text').innerText = item.description;

    return cardHtml;
}


// ==== item ====

async function loadItem(item, itemType) {
    const itemHtml = await getContentHtml('item.html');
    const itemExtendedHtml = await getContentHtml(`${itemType}s/${item.id}.html`);

    itemHtml.querySelector('#title').innerText = item.title;
    itemHtml.querySelector('#description').innerText = item.description;

    itemHtml.querySelectorAll(`[data-item-type="${itemType}"]`).forEach((element) => {
        element.hidden = false;
    });

    itemHtml.querySelector(`#notes ul[data-item-type="${itemType}"]`).append(
        ...itemExtendedHtml.querySelectorAll('#notes li')
    );

    for (const download of item.downloads) {
        const downloadHtml = createDownloadHtml(itemHtml, item, itemType, download);
        itemHtml.querySelector('#downloads tbody').append(downloadHtml);
    }

    for (const image of item.images) {
        const imageHtml = createImageHtml(itemHtml, item, itemType, image);
        itemHtml.querySelector('#images ul').append(imageHtml);
    }

    itemHtml.append(
        ...itemExtendedHtml.querySelectorAll('#extra section')
    );

    document.querySelector('main').innerHTML = itemHtml.innerHTML;
}

function createDownloadHtml(itemHtml, item, itemType, download) {
    const downloadHtml = itemHtml.querySelector('#download-template').content.cloneNode(true);

    downloadHtml.querySelector('a').href = `./downloads/${itemType}s/${download.name ?? item.id}/${download.version}.zip`;
    downloadHtml.querySelector('a').download = `${download.name ?? item.id}-${download.version}.zip`;
    downloadHtml.querySelectorAll('td')[1].innerText = download.version;
    downloadHtml.querySelectorAll('td')[2].innerText = download.hash;

    return downloadHtml;
}

function createImageHtml(itemHtml, item, itemType, image) {
    const imageHtml = itemHtml.querySelector('#image-template').content.cloneNode(true);

    imageHtml.querySelector('.figure-img').src = `./img/${itemType}s/${item.id}/${image.name}`;
    imageHtml.querySelector('.figure-img').alt = image.name;
    imageHtml.querySelector('.figure-caption').innerText = image.description;

    return imageHtml;
}


// ==== ====

async function getContentHtml(path) {
    const response = await fetch(`./content/${path}`);
    const html = await response.text();

    const parser = new DOMParser();
    return parser.parseFromString(html, 'text/html').body;
}


(() => {
    const searchParams = new URLSearchParams(location.search);

    const mod = mods.find(mod => mod.id === searchParams.get('mod'));
    if (mod) {
        loadItem(mod, 'mod');
        return;
    }

    const pack = packs.find(pack => pack.id === searchParams.get('pack'));
    if (pack) {
        loadItem(pack, 'pack');
        return;
    }

    loadCards();
})();
