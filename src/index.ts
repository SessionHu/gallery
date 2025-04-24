declare const getIndexJson: () => Promise<{img: FitROMItem[]}>;
declare const getImage: (item: FitROMItem) => Promise<HTMLImageElement>;

type Layer = {
    alert: (content: string, options?: any, yes?: (index: number) => any) => number,
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

import './css/style.scss';

interface FitROMItem {
  name: string,
  mtime: number,
  raw?: string[],
  hashed?: string[]
}

function shufArray<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function teenmode(enable: boolean) {
  const elems = document.querySelectorAll(".img-container img");
  if (enable) {
    layui.layer.msg("Teen mode enabled");
    elems.forEach((elem) => {
      (elem as HTMLElement).style.filter = "blur(4px)";
    });
  } else {
    elems.forEach((elem) => {
      (elem as HTMLElement).style.filter = "none";
    });
  }
}

(async () => {
    // show loading layer
    const loadLayer: number = layer.load(1, {
        shade: [.8, "#000"]
    });
    layer.open({
      content: 'data:text/plain;charset=utf8,本站已经长期没有维护, 加载速度缓慢甚至无限加载属于正常现象, 现已加入重构计划',
      skin: 'layui-layer-win10',
      type: 2
    });
    const galleryContainer: HTMLElement = document.getElementById("gallery-container") as HTMLElement;
    // fetch
    const json = await getIndexJson();
    shufArray(json.img);
    const elems: Promise<HTMLDivElement>[] = [];
    for (const img of json.img) {
      elems.push((async () => {
        // div
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");
        // img
        const imgElem = await getImage(img);
        // imgElem.src = ""; // for debug
        imgElem.title = imgElem.alt;
        imgElem.alt = img.name;
        if (!imgElem.title) imgElem.title = img.name;
        const imgClipper = document.createElement("div");
        imgClipper.classList.add("img-clipper");
        imgClipper.appendChild(imgElem);
        imgContainer.appendChild(imgClipper);
        // desc
        const imgDesc = document.createElement("div");
        imgDesc.className = "img-desc";
        imgDesc.innerHTML = `
          <span class="img-desc-name">${img.name}</span>
          <span class="img-desc-date">${new Date(img.mtime * 1000).toLocaleString()}</span>
        `;
        imgContainer.appendChild(imgDesc);
        // append
        galleryContainer.insertAdjacentElement('afterbegin', imgContainer);
        return imgContainer;
      })());
    }
    await Promise.all(elems);
    // settings preset
    if (!Object.keys(layui.data("sessxgallery")).length) {
        layui.data("sessxgallery", { key: "teen", value: true });
    }
    teenmode(layui.data("sessxgallery", {key: "teen"}));
    // fetch settings
    const tmpdiv = document.createElement("div");
    tmpdiv.innerHTML = await (await fetch("/settings.html")).text();
    // settings entrace
    const setcontainer = document.body.querySelector(".set-container") as HTMLElement;
    layui.util.on("lay-on", {
        "set-btn": function () {
            setTimeout(() => this.classList.remove("layui-this"), 200);
            if (setcontainer.innerHTML) {
                // hide
                setcontainer.style.opacity = "0";
                setTimeout(() => setcontainer.innerHTML = "", 1e2);
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
    document.body.addEventListener("click", (ev: MouseEvent) => {
        if (setcontainer.contains(ev.target as Node) ||
            ev.target === setbtn ||
            setcontainer.innerHTML === "")
        {
            return;
        }
        setcontainer.style.opacity = "0";
        setTimeout(() => setcontainer.innerHTML = "", 1e2);
    });
    // big photo viewer
    layer.photos({
        photos: ".img-container",
        shade: [.6, "#000"]
    });
    // close loading layer
    layer.close(loadLayer);
})();
