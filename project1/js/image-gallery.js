function imageSelect(evt) {
    let target = evt.target;

    let src = evt.target.getAttribute("data-src");
    let alt = evt.target.getAttribute("data-alt");

    let container = document.querySelector("#fullResImage");

    container.src = src;
    container.parentElement.setAttribute("data-alt", alt);

    positionBorder(target);
}

function positionBorder(target) {
    let border = document.querySelector('#selectBorder');
    let targetPos = target.getBoundingClientRect()
    let parentPos = target.parentElement.getBoundingClientRect()
    let rect = target.getBoundingClientRect();
    border.style.left = targetPos.left - 5 + "px";
    border.style.top = targetPos.top - 5 + "px";
    border.style.display = "block"
}

{
    setTimeout(() => {
        let target = document.querySelector(".thumbnail");
        positionBorder(target);
    }, 50);
}

Array.from(document.getElementsByClassName("thumbnail")).forEach((a) => {
    a.addEventListener("click", imageSelect);
})