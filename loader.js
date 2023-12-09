const mods = [
    {
        id: 'exception-reporter',
        title: 'Exception Reporter',
        description: "Displays a dialog with exception's information when it occurs.",
    },
    {
        id: 'free-camera',
        title: 'Free Camera',
        description: "Allows moving the external camera around the city. Plus various camera properties that can be changed.",
    },
    {
        id: 'bully-repellent',
        title: 'Bully Repellent',
        description: "Automatically kicks or mutes a player on the user's blacklist.",
    },
    {
        id: 'protection',
        title: 'Protection',
        description: "Replaces the new vehicle's or challenge's ID sent over the network to avoid crashing players.",
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
            dummyDiv.querySelector('ul').append(modCard);
        }
        return dummyDiv.innerHTML;
    }

    async #getModPage(mod) {
        const dummyDiv = document.createElement('div');
        dummyDiv.innerHTML = await Loader.#getPage('mod');
        dummyDiv.querySelector('.mod-title').textContent = mod.title;
        dummyDiv.querySelector('.mod-description').textContent = mod.description;
        return dummyDiv.innerHTML;
    }

    static async #getPage(page) {
        const response = await fetch(`/pages/${page}.html`);
        const html = await response.text();
        return html;
    }
}


(() => {
    const loader = new Loader();
    loader.load();
})();