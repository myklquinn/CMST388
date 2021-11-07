// Alter the src and caption information for full-resolution container after thumbnail is clicked
function imageSelect(evt) {

    // set target to clicked thumbnail and collect attributes
    let target = evt.target;
    let src = evt.target.getAttribute("data-src");
    let alt = evt.target.getAttribute("data-alt");

    // set attributes of full-resolution container
    let container = document.querySelector("#fullResImage");
    container.src = src;
    container.parentElement.setAttribute("data-alt", alt);

    // Call floating border repositioning function
    positionBorder(target);
}

// Repositions the floating border to the selected image after thumbnail is clicked
function positionBorder(target) {

    // select floating border element
    let border = document.querySelector('#selectBorder');

    // collect clicked thumbnail position information
    let targetPos = target.getBoundingClientRect()
    let rect = target.getBoundingClientRect();

    // reposition floating border and make visible 
    border.style.left = targetPos.left - 5 + "px";
    border.style.top = targetPos.top - 5 + "px";
    border.style.display = "block"
}

// Initially positions floating border onload
{
    setTimeout(() => {
        let target = document.querySelector(".thumbnail");
        positionBorder(target);
    }, 50);
}

// Sets event listener for thumbnail being clicked
Array.from(document.getElementsByClassName("thumbnail")).forEach((a) => {
    a.addEventListener("click", imageSelect);
})