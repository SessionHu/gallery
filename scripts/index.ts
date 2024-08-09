declare const getIndexJson: () => Promise<FitROMIndex>;
declare const getImage: (paths: string[]) => Promise<HTMLImageElement>;

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
    const galleryContainer: HTMLElement = document.getElementById("gallery-container") as HTMLElement;
    const json: FitROMIndex = await getIndexJson();
    for (const img of json.img) {
        const imgContainer: HTMLElement = document.createElement("div");
        imgContainer.classList.add("img-container");
        const imgElem = await getImage(img.path);
        if (imgElem.alt === "") {
            imgElem.alt = img.name;
        }
        imgContainer.appendChild(imgElem);
        galleryContainer.appendChild(imgContainer);
    }
    randomChildElem(galleryContainer);
})();
