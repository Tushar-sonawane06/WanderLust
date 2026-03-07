const grid = document.querySelector(".grid-bg");

for(let i = 0; i < 240; i++){
    const box = document.createElement("div");
    box.classList.add("grid-box");

    box.addEventListener("mouseenter", () => {
        box.style.background = "#1f1b1e";

        setTimeout(()=>{
            box.style.background = "transparent";
        },300);
    });

    grid.appendChild(box);
}