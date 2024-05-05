// const mods = [
//     {
//         id: 'exception-reporter',
//         title: 'Exception Reporter',
//         description: "Displays a dialog with exception's information when it occurs.",
//         notes: [
//             "It may not catch every exception.",
//             "Don't expect people immediatelly knowing what's wrong by uploading a screenshot of the exception report.",
//         ],
//         images: [
//             'exception-reporter.png',
//         ],
//     },
//     {
//         id: 'free-camera',
//         title: 'Free Camera',
//         description: "Allows moving the external camera around the city. Plus various camera properties that can be changed.",
//         notes: [
//             "Press F7 to toggle the menu.",
//             "Use your mouse to freely transform the camera.",
//         ],
//         images: [
//             'free-camera-menu.png',
//             'free-camera.png',
//         ],
//     },
//     {
//         id: 'bully-repellent',
//         title: 'Bully Repellent',
//         description: "Automatically kicks or mutes a player on the user's blacklist.",
//         notes: [
//             "Press F7 to toggle the menu.",
//             "Players added to the blacklist aren't automatically kicked or muted, you must check either 'Autokick' or 'Automute'.",
//             "You cannot add yourself to the list, nor the same player multiple times.",
//         ],
//         images: [
//             'bully-repellent-menu.png',
//         ],
//     },
//     {
//         id: 'protection',
//         title: 'Protection',
//         description: "Replaces a new vehicle's or challenge's ID sent over the network to avoid crashing players.",
//         notes: [
//             "Press F7 to toggle the menu.",
//             "New vehicles and challenges are added to the protection list automatically.",
//             "You can individually set the replacement vehicle/challenge, or let it use the fallback vehicle/challenge.",
//         ],
//         images: [
//             'protection-menu.png',
//         ],        
//     },
// ];

// const packs = [
//     {
//         id: 'rv2-vehicles',
//         title: 'RV2 Vehicles',
//         description: "Ported RV2 vehicles.",
//     },
// ];


class Controller {
    constructor() {
        this.main = document.querySelector('main');
        
        const searchParams = new URLSearchParams(location.search);
        this.queryMod = searchParams.get('mod');
        this.queryPack = searchParams.get('pack');
    }

    // route() {
    //     const mod = mods.find(mod => mod.id === this.queryMod);
    //     if (mod) {
    //         this.#loadMod(mod);
    //         return;
    //     }

    //     const pack = packs.find(pack => pack.id === this.queryPack);
    //     if (pack) {
    //         this.#loadPack(pack);
    //         return;
    //     }

    //     this.#loadCards();
    // }

    // async #loadCards() {
    //     const html = await Controller.#getContentHTML('cards.html');
        
    //     for (const mod of mods) {
    //         const cardTemplate = html.querySelector('#card').content.cloneNode(true);
    //         cardTemplate.querySelector('a').href = `?mod=${mod.id}`;
    //         cardTemplate.querySelector('.card-title').textContent = mod.title;
    //         cardTemplate.querySelector('.card-text').textContent = mod.description;
    //         html.querySelector('#mods').append(cardTemplate);
    //     }

    //     for (const pack of packs) {
    //         const cardTemplate = html.querySelector('#card').content.cloneNode(true);
    //         cardTemplate.querySelector('a').href = `?pack=${pack.id}`;
    //         cardTemplate.querySelector('.card-title').textContent = pack.title;
    //         cardTemplate.querySelector('.card-text').textContent = pack.description;
    //         html.querySelector('#packs').append(cardTemplate);
    //     }

    //     this.main.innerHTML = html.innerHTML;
    // }

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

    // static async #getContentHTML(path) {
    //     const response = await fetch(`./content/${path}`);
    //     const html = await response.text();
        
    //     const parser = new DOMParser();
    //     return parser.parseFromString(html, 'text/html').body;
    // }
}


(() => {
    const controller = new Controller();
    // controller.route();
})();
