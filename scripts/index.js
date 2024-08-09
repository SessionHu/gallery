"use strict";
function randomChildElem(elem) {
    const childElems = Array.from(elem.children);
    const newElems = [];
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
    const galleryContainer = document.getElementById("gallery-container");
    const json = await getIndexJson();
    for (const img of json.img) {
        const imgContainer = document.createElement("div");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBV0EsU0FBUyxlQUFlLENBQUMsSUFBaUI7SUFDdEMsTUFBTSxVQUFVLEdBQWMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEQsTUFBTSxRQUFRLEdBQWMsRUFBRSxDQUFDO0lBQy9CLE9BQU8sVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUMzQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEUsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUNwQixLQUFLLE1BQU0sT0FBTyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztBQUNMLENBQUM7QUFFRCxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ1IsTUFBTSxnQkFBZ0IsR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBZ0IsQ0FBQztJQUNsRyxNQUFNLElBQUksR0FBZ0IsTUFBTSxZQUFZLEVBQUUsQ0FBQztJQUMvQyxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QixNQUFNLFlBQVksR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRSxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM1QyxNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxPQUFPLENBQUMsR0FBRyxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUMzQixDQUFDO1FBQ0QsWUFBWSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQyxFQUFFLENBQUMifQ==