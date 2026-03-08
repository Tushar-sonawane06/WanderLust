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