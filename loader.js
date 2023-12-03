class Loader {
    constructor() {
        this.mods = null;
        this.main = document.querySelector('main');
        this.queryMod = new URLSearchParams(location.search).get('mod');
    }

    async load() {
        this.mods = await Loader.#getMods();
        const mod = this.mods.find(mod => mod.id === this.queryMod);
        if (mod === undefined) {
            this.main.innerHTML = await this.#getModsPage();
        } else {
            this.main.innerHTML = await this.#getModPage(mod);
        }
    }

    async #getModsPage() {
        const dummyDiv = document.createElement('div');
        dummyDiv.innerHTML = await Loader.#getPage('mods');
        for (const mod of this.mods) {
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

    static async #getMods() {
        const response = await fetch('/mods.json');
        const json = await response.json();
        return json;
    }

    static async #getPage(page) {
        const response = await fetch(`/pages/${page}.html`);
        const html = await response.text();
        return html;
    }
}


(function () {
    const loader = new Loader();
    loader.load();
})();