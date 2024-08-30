export default class {
    #itemHtml = null;
    #item = null;
    #itemType = null;

    constructor(itemHtml, item, itemType) {
        this.#itemHtml = itemHtml;
        this.#item = item;
        this.#itemType = itemType;
    }

    render() {
        this.#itemHtml.querySelector('#title').innerText = this.#item.title;
        this.#itemHtml.querySelector('#description').innerText = this.#item.description;
        
        this.#itemHtml.querySelectorAll(`[data-item-type="${this.#itemType}"]`).forEach((element) => {
            element.hidden = false;
        });

        for (const download of this.#item.downloads) {
            const downloadHtml = this.#fillDownload(download);
            this.#itemHtml.querySelector('#downloads tbody').append(downloadHtml);
        }

        for (const image of this.#item.images) {
            const imageHtml = this.#fillImage(image);
            this.#itemHtml.querySelector('#images ul').append(imageHtml);
        }
        
        return this.#itemHtml.innerHTML;
    }

    #fillDownload(download) {
        const downloadHtml = this.#itemHtml.querySelector('#download-template').content.cloneNode(true);

        downloadHtml.querySelector('a').href = `./downloads/${this.#itemType}s/${download.name ?? this.#item.id}/${download.version}.zip`;
        downloadHtml.querySelector('a').download = `${download.name ?? this.#item.id}-${download.version}.zip`;
        downloadHtml.querySelectorAll('td')[1].innerText = download.version;
        downloadHtml.querySelectorAll('td')[2].innerText = download.hash;

        return downloadHtml;
    }

    #fillImage(image) {
        const imageHtml = this.#itemHtml.querySelector('#image-template').content.cloneNode(true);
        
        imageHtml.querySelector('.figure-img').src = `./img/${this.#itemType}s/${this.#item.id}/${image.name}`;
        imageHtml.querySelector('.figure-img').alt = image.name;
        imageHtml.querySelector('.figure-caption').innerText = image.description;
        
        return imageHtml;
    }
}
