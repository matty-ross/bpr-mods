const mods = [
    {
        id: 'exception-reporter',
        title: 'Exception Reporter',
        description: "Displays a dialog with exception's information when it occurs.",
        notes: [
            "It may not catch every exception.",
            "Don't expect people immediatelly knowing what's wrong by uploading a screenshot of the exception report.",
        ],
        images: [
            'exception-reporter.png',
        ],
    },
    {
        id: 'free-camera',
        title: 'Free Camera',
        description: "Allows moving the external camera around the city. Plus various camera properties that can be changed.",
        notes: [
            "Press F7 to toggle the menu.",
            "Use your mouse to freely transform the camera.",
        ],
        images: [
            'free-camera-menu.png',
            'free-camera.png',
        ],
    },
    {
        id: 'bully-repellent',
        title: 'Bully Repellent',
        description: "Automatically kicks or mutes a player on the user's blacklist.",
        notes: [
            "Press F7 to toggle the menu.",
            "Players added to the blacklist aren't automatically kicked or muted, you must check either 'Autokick' or 'Automute'.",
            "You cannot add yourself to the list, nor the same player multiple times.",
        ],
        images: [
            'bully-repellent-menu.png',
        ],
    },
    {
        id: 'protection',
        title: 'Protection',
        description: "Replaces a new vehicle's or challenge's ID sent over the network to avoid crashing players.",
        notes: [
            "Press F7 to toggle the menu.",
            "New vehicles and challenges are added to the protection list automatically.",
            "You can individually set the replacement vehicle/challenge, or let it use the fallback vehicle/challenge.",
        ],
        images: [
            'protection-menu.png',
        ],        
    },
];


class Controller {
    constructor() {
        this.main = document.querySelector('main');
        
        const searchParams = new URLSearchParams(location.search);
        this.queryMod = searchParams.get('mod');
        this.queryPack = searchParams.get('pack');
    }

    route() {
        if (this.queryMod === null && this.queryPack === null) {
            this.#loadCards();
            return;
        }
    }

    async #loadCards() {
        const html = await Controller.#getContentHTML('cards.html');
        
        for (const mod of mods) {
            const card = html.querySelector('#card').content.cloneNode(true);
            card.querySelector('a').href = `?mod=${mod.id}`;
            card.querySelector('.card-title').textContent = mod.title;
            card.querySelector('.card-text').textContent = mod.description;
            html.querySelector('#mods').append(card);
        }

        this.main.innerHTML = html.innerHTML;
    }

    // ------------

    // async load() {
    //     const mod = mods.find(mod => mod.id === this.queryMod);
    //     if (mod === undefined) {
    //         this.main.innerHTML = await this.#getModsPage();
    //     } else {
    //         this.main.innerHTML = await this.#getModPage(mod);
    //     }
    // }

    // async #getModsPage() {
    //     const dummyDiv = document.createElement('div');
    //     dummyDiv.innerHTML = await Loader.#getPage('mods');
    //     for (const mod of mods) {
    //         const modCard = dummyDiv.querySelector('#mod-card').content.cloneNode(true);
    //         modCard.querySelector('a').href = `?mod=${mod.id}`;
    //         modCard.querySelector('.card-title').textContent = mod.title;
    //         modCard.querySelector('.card-text').textContent = mod.description;
    //         dummyDiv.querySelector('#mods').append(modCard);
    //     }
    //     return dummyDiv.innerHTML;
    // }

    // async #createItem(item) {
    //     const itemTemplate = Loader.#loadTemplate('item');
        
    //     itemTemplate.querySelector('#title').textContent = item.title;
    //     itemTemplate.querySelector('#description').textContent = item.description;
    //     for (const note of item.notes) {
    //         const liElement = document.createElement('li');
    //         liElement.textContent = note;
    //         itemTemplate.querySelector('#notes').append(liElement);
    //     }
    //     for (const image of item.images) {
    //         const imageTemplateElement = dummyDiv.querySelector('#image').content.cloneNode(true);
    //         imageTemplateElement.querySelector('img').src = `./img/mods/${image}`;
    //         imageTemplateElement.querySelector('img').alt = image;
    //         dummyDiv.querySelector('#images').append(imageTemplateElement);
    //     }
        
    //     return itemTemplate;
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
