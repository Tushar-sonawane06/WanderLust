document.addEventListener("DOMContentLoaded", () => {

    const password = document.getElementById("password");
    const toggle = document.querySelector(".password-toggle");
    
    toggle.addEventListener("click", () => {
        console.log("clicked");
        if(password.type === "password"){
            password.type = "text";
            toggle.classList.remove("fa-eye");
            toggle.classList.add("fa-eye-slash");
        }
        else{
            password.type = "password";
            toggle.classList.remove("fa-eye-slash");
            toggle.classList.add("fa-eye");
        }
    
    });
    
});

//theme toggle
const toggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("theme-dark");
    toggle.checked = true;
}

toggle.addEventListener("change", function () {

    if (toggle.checked) {
        document.body.classList.add("theme-dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("theme-dark");
        localStorage.setItem("theme", "light");
    }

});