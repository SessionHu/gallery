declare const getIndexJson: () => Promise<FitROMIndex>;
declare const getImage: (paths: string[]) => Promise<HTMLImageElement>;

type Layer = {
    load: (icon: number, options?: any) => number,
    open: (options: any) => void,
    tips: (content: string, elem: Element | string, options?: any) => void,
    photos: (options: any) => void,
    close: (index: number, callback?: () => void ) => void
};

declare const layui: {
    flow: {
        lazyimg: (options: any) => void
    },
    layer: Layer,
    form: {
        render: (type?: string, filter?: string) => void
    },
    util: {
        on: (attr: string, events: any, options?: any) => void
    }
};

declare const layer: Layer;

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

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
        // imgElem.src = ""; // for debug
        imgElem.title = imgElem.alt;
        imgElem.alt = img.name;
        if (imgElem.title === "") imgElem.title = img.name;
        const imgClipper: HTMLDivElement = document.createElement("div");
        imgClipper.classList.add("img-clipper");
        imgClipper.appendChild(imgElem);
        imgContainer.appendChild(imgClipper);
        // desc
        const imgDesc: HTMLDivElement = document.createElement("div");
        imgDesc.className = "img-desc";
        imgDesc.innerHTML = `
            <span class="img-desc-name">${img.name}</span>
            <span class="img-desc-date">${new Date(img.mtime * 1000).toLocaleString()}</span>
        `;
        imgContainer.appendChild(imgDesc);
        // append
        galleryContainer.appendChild(imgContainer);
    }
    // random child elements
    randomChildElem(galleryContainer);
    // fetch settings
    const tmpdiv = document.createElement("div");
    tmpdiv.innerHTML = await (await fetch("/settings.html")).text();
    // set-btn
    const setcontainer = document.body.querySelector(".set-container") as HTMLElement;
    layui.util.on("lay-on", {
        "set-btn": async function () {
            window.setTimeout(() => this.classList.remove("layui-this"), 200);
            if (setcontainer.innerHTML !== "") {
                // hide
                setcontainer.style.opacity = "0";
                await sleep(100);
                setcontainer.innerHTML = "";
            } else {
                // show
                setcontainer.innerHTML = tmpdiv.querySelector(".set-container")?.innerHTML as string;
                layui.form.render();
                setcontainer.style.opacity = "1";
            }
        }
    });
    // big photo viewer
    document.querySelectorAll(".img-container").forEach((elem: Element) => {
        elem.addEventListener("click", async () => {
            setcontainer.style.opacity = "0";
            await sleep(100);
            setcontainer.innerHTML = "";
        });
    });
    layer.photos({
        photos: ".img-container",
        shade: [.6, "#000"]
    });
    // close loading layer
    layer.close(loadLayer);
})();
