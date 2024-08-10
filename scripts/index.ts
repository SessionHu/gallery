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
    const loadLayer: number = layer.load(1, {
        shade: [.8, "#000"]
    });
    const galleryContainer: HTMLElement = document.getElementById("gallery-container") as HTMLElement;
    // fetch
    const json: FitROMIndex = await getIndexJson();
    for (const img of json.img) {
        // div
        const imgContainer: HTMLElement = document.createElement("div");
        imgContainer.classList.add("img-container");
        // img
        const imgElem = await getImage(img.path);
        imgElem.title = imgElem.alt;
        imgElem.alt = img.name;
        if (imgElem.title === "") imgElem.title = img.name;
        imgContainer.appendChild(imgElem);
        // desc
        const imgDesc: HTMLDivElement = document.createElement("div");
        imgDesc.className = "img-desc";
        imgDesc.innerHTML = `
            <div>
                <span class="img-desc-name">${img.name}</span>
                <span class="img-desc-date layui-font-12">${new Date(img.mtime * 1000).toLocaleString()}</span>
            </div>
        `;
        imgContainer.appendChild(imgDesc);
        // append
        galleryContainer.appendChild(imgContainer);
    }
    // random child elements
    randomChildElem(galleryContainer);
    // big photo viewer
    layer.photos({
        photos: ".img-container"
    });
    // close loading layer
    layer.close(loadLayer);
})();
