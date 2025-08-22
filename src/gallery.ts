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
}

class GalleryItem {
  #elem = document.createElement('div');
  #img = document.createElement('img');
  #label = document.createElement('div');
  get elem() {
    return this.#elem;
  }
  constructor(rawimg: string) {
    this.#img.src = rawimg;
    this.#elem.append(this.#label, this.#img);
  }
}

const gallery = new Gallery(document.querySelector('div#gallery')!);
for (let i = 0; i < 12; i++)
  gallery.add(new GalleryItem('https://picsum.photos/400/300?' + i));
