declare const getIndexJson: () => Promise<FitROMIndex>;
declare const getImage: (paths: string[]) => Promise<HTMLImageElement>;

declare const layer: {
    load: (icon: number, options?: any) => number,
    photos: (options: any) => void,
    close: (index: number, callback?: () => void ) => void
};

interface FitROMIndex {
    img: {
        name: string,
        mtime: number,
        path: string[]
    }[]
}

function randomChildElem(elem: HTMLElement) {
    const childElems: Element[] = Array.from(elem.children);
    const newElems: Element[] = [];
    while (childElems.length > 0) {
        const randomIndex = Math.floor(Math.random() * childElems.length);
        newElems.push(childElems.splice(randomIndex, 1)[0]);
    }
    elem.innerHTML = "";
    for (const newElem of newElems) {
        elem.appendChild(newElem);
    }
}

(async () => {
    // show loading layer
    const loadLayer: number = layer.load(1);
    const galleryContainer: HTMLElement = document.getElementById("gallery-container") as HTMLElement;
    galleryContainer.style.visibility = "hidden";
    // fetch
    const json: FitROMIndex = await getIndexJson();
    for (const img of json.img) {
        const imgContainer: HTMLElement = document.createElement("div");
        imgContainer.classList.add("img-container");
        imgContainer.classList.add("layui-padding-1");
        const imgElem = await getImage(img.path);
        if (imgElem.alt === "") {
            imgElem.alt = img.name;
        }
        imgElem.title = img.name;
        imgContainer.appendChild(imgElem);
        galleryContainer.appendChild(imgContainer);
    }
    // random child elements
    randomChildElem(galleryContainer);
    // big photo viewer
    layer.photos({
        photos: ".img-container"
    });
    // close loading layer
    galleryContainer.style.visibility = "visible";
    layer.close(loadLayer);
})();
