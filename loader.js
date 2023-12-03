async function getMods() {
    const response = await fetch('/mods.json');
    const mods = await response.json();
    return mods;
}

async function getModsPage() {
    const response = await fetch('/pages/mods.html');
    const modsPage = await response.text();
    return modsPage;
}

function createModCard(mod) {
    const modCard = document.querySelector('#mod-card').content.cloneNode(true);
    modCard.querySelector('a').href = `?mod=${mod.id}`;
    modCard.querySelector('.card-title').textContent = mod.title;
    modCard.querySelector('.card-text').textContent = mod.description;
    return modCard;
}


(async function () {
    const mods = await getMods();
    const main = document.querySelector('main');
    const queryMod = new URLSearchParams(location.search).get('mod');
    
    const mod = mods.find(mod => mod.id === queryMod);
    if (mod === undefined) {
        const modsPage = await getModsPage();
        main.innerHTML = modsPage;
        for (const mod of mods) {
            const modCard = createModCard(mod);
            document.querySelector('#mods').append(modCard);
        }
    } else {
        console.log('unimplemented yet');
    }
})();
