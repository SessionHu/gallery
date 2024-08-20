declare const getIndexJson: () => Promise<FitROMIndex>;
declare const getImage: (paths: string[]) => Promise<HTMLImageElement>;

type Layer = {
    load: (icon: number, options?: any) => number,
    open: (options: any) => void,
    tips: (content: string, elem: Element | string, options?: any) => void,
    photos: (options: any) => void,
    close: (index: number, callback?: () => void ) => void,
    msg: (content: string, options?: any, end?: () => void) => number,
};

declare const layui: {
    flow: {
        lazyimg: (options: any) => void
    },
    layer: Layer,
    form: {
        render: (type?: string, filter?: string) => void,
        on: (eventfiter: string, callback: (data: any) => void) => void,
        val: (filter: string, obj: any) => any
    },
    util: {
        on: (attr: string, events: any, options?: any) => void
    },
    data: (table: string, settings?: { key: string, value?: any }) => any
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

function teenmode(enable: boolean) {
    if (enable) {
        layui.layer.msg("Teen mode enabled");
        document.querySelectorAll(".img-container img").forEach((elem: Element) => {
            (elem as HTMLElement).style.filter = "blur(4px)";
        });
    } else {
        document.querySelectorAll(".img-container img").forEach((elem: Element) => {
            (elem as HTMLElement).style.filter = "none";
        });
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
    // settings preset
    if (Object.keys(layui.data("sessxgallery")).length === 0) {
        layui.data("sessxgallery", { key: "teen", value: true });
    }
    teenmode(layui.data("sessxgallery", {key: "teen"}));
    // fetch settings
    const tmpdiv = document.createElement("div");
    tmpdiv.innerHTML = await (await fetch("/settings.html")).text();
    // settings entrace
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
                // render
                setcontainer.innerHTML = tmpdiv.querySelector(".set-container")?.innerHTML as string;
                layui.form.render();
                // value
                layui.form.val("set-form", {
                    "ctl-switch-teen": layui.data("sessxgallery", {key: "teen"})
                });
                // show
                setcontainer.style.opacity = "1";
            }
        }
    });
    // settings section
    layui.form.on('switch(ctl-switch-teen)', (data: any) => {
        teenmode(layui.data("sessxgallery", {
            key: "teen",
            value: data.othis[0].classList.contains("layui-form-onswitch")
        }));
    });
    // close settings on click
    const setbtn = document.querySelector("#navset a");
    document.body.addEventListener("click", async (ev: MouseEvent) => {
        console.log(ev.target);
        if (setcontainer.contains(ev.target as Node) ||
            ev.target === setbtn ||
            setcontainer.innerHTML === "")
        {
            return;
        }
        setcontainer.style.opacity = "0";
        await sleep(100);
        setcontainer.innerHTML = "";
    });
    // big photo viewer
    layer.photos({
        photos: ".img-container",
        shade: [.6, "#000"]
    });
    // close loading layer
    layer.close(loadLayer);
})();
