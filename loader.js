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


class Loader {
    constructor() {
        this.main = document.querySelector('main');
        this.queryMod = new URLSearchParams(location.search).get('mod');
    }

    async load() {
        const mod = mods.find(mod => mod.id === this.queryMod);
        if (mod === undefined) {
            this.main.innerHTML = await this.#getModsPage();
        } else {
            this.main.innerHTML = await this.#getModPage(mod);
        }
    }

    async #getModsPage() {
        const dummyDiv = document.createElement('div');
        dummyDiv.innerHTML = await Loader.#getPage('mods');
        for (const mod of mods) {
            const modCard = dummyDiv.querySelector('#mod-card').content.cloneNode(true);
            modCard.querySelector('a').href = `?mod=${mod.id}`;
            modCard.querySelector('.card-title').textContent = mod.title;
            modCard.querySelector('.card-text').textContent = mod.description;
            dummyDiv.querySelector('#mods').append(modCard);
        }
        return dummyDiv.innerHTML;
    }

    async #getModPage(mod) {
        const dummyDiv = document.createElement('div');
        dummyDiv.innerHTML = await Loader.#getPage('mod');
        dummyDiv.querySelector('.mod-title').textContent = mod.title;
        dummyDiv.querySelector('.mod-description').textContent = mod.description;
        for (const note of mod.notes) {
            const li = document.createElement('li');
            li.textContent = note;
            dummyDiv.querySelector('.mod-notes').append(li);
        }
        for (const image of mod.images) {
            const modImage = dummyDiv.querySelector('#mod-image').content.cloneNode(true);
            modImage.querySelector('img').src = `./img/mods/${image}`;
            modImage.querySelector('img').alt = image;
            dummyDiv.querySelector('.mod-images').append(modImage);
        }
        for (const a of dummyDiv.querySelectorAll('.mod-downloads a')) {
            const version = a.textContent;
            a.href = `./downloads/${version}/${mod.id}.zip`;
            a.download = `${mod.id}-${version}.zip`;
        }
        return dummyDiv.innerHTML;
    }

    static async #getPage(page) {
        const response = await fetch(`./pages/${page}.html`);
        const html = await response.text();
        return html;
    }
}


(() => {
    const loader = new Loader();
    loader.load();
})();