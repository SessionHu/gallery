/**
 * Gallery represents a collection of GalleryItem objects.
 */
class Gallery {
  readonly #elem: HTMLDivElement;
  readonly #items = new Array<GalleryItem>;
  constructor(elem: HTMLDivElement) {
    this.#elem = elem;
  }
  add(item: GalleryItem) {
    this.#items.push(item);
    this.#elem.appendChild(item.elem);
  }
  remove(item: GalleryItem) {
    this.#elem.removeChild(item.elem);
    this.#items.splice(this.#items.indexOf(item), 1);
  }
}

/**
 * GalleryItem represents a single item in the gallery.
 */
class GalleryItem {
  readonly #elem = document.createElement('div');
  readonly #img = document.createElement('img');
  readonly #label: GalleryLabel;
  get elem() {
    return this.#elem;
  }
  constructor(rawimg: string, label: GalleryLabel) {
    this.#img.src = rawimg;
    this.#img.loading = 'lazy';
    this.#elem.append((this.#label = label).elem, this.#img);
  }
}

class GalleryLabel {
  #elem = document.createElement('div');
  get elem() {
    return this.#elem;
  }
  #wrapper = document.createElement('div');
  #fname: string;
  #date: Date;
  #desc: string;
  /**
   * Constructs a new GalleryLabel.
   * @param fname - The file name of the gallery item.
   * @param date  - The last modified timestamp of the file.
   * @param desc  - A short description for the gallery item.
   */
  constructor(fname: string, date: Date, desc: string) {
    this.#fname = fname;
    this.#date = date;
    this.#desc = desc;
    this.#render();
  }
  #render() {
    for (const e of this.elem.childNodes)
      e.remove();
    const fne = document.createElement('div');
    fne.textContent = this.#fname;
    const dte = document.createElement('time');
    dte.textContent = this.#date.toLocaleString();
    dte.dateTime = this.#date.toISOString();
    const dse = document.createElement('div');
    dse.textContent = this.#desc;
    this.#wrapper.append(fne, dte, dse);
    this.#elem.appendChild(this.#wrapper);
  }
}

// instantiate gallery
const gallery = new Gallery(document.querySelector('div#gallery')!);

// placeholder for testing style
for (let i = 0; i < 12; i++)
  gallery.add(new GalleryItem('https://picsum.photos/400/300', new GalleryLabel(`stub${i}.jpg`, new Date, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')));
