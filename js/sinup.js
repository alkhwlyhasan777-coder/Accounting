function formValidation() {
    //Name=========================
    const inputNam = document.querySelector(".username");
    inputNam.addEventListener("input", function () {
        // localStorage.setItem("username", inputNam.value);
    });
    //password=========================
    const pass = document.querySelector(".password");
    const text = document.querySelector(".form-text");
    pass.addEventListener("input", function () {
        // localStorage.setItem("password", pass.value);
        if (pass.value.length >= 8) { text.innerText = "Your password is valid."; text.style.color = "green"; }
        else { text.innerText = "Your password must be at least 8 characters long."; }
    });
    // Toggle password visibility==========================
    function password() {
        const password = document.getElementById("inputPassword5");
        const toggle = document.getElementById("togglePassword");
        toggle.addEventListener("click", function () {
            if (password.type === "password") {
                password.type = "text";
                toggle.classList.remove("bi-eye-fill");
                toggle.classList.add("bi-eye-slash-fill");
            }
            else {
                password.type = "password";
                toggle.classList.remove("bi-eye-slash-fill");
                toggle.classList.add("bi-eye-fill");
            }
        });
    };
    password();
    //email validation==========================
    const emailInput = document.querySelector(".email");
    const emailInputText = document.querySelector(".email-text");
    emailInput.addEventListener("input", function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // localStorage.setItem("email", emailInput.value);
        if (emailRegex.test(emailInput.value)) {
            emailInputText.innerText = "Your email is valid.";
            emailInputText.style.color = "green";
        } else {
            emailInputText.innerText =
                "Your email is not valid.";
            emailInputText.style.color = "black";
        }
    });
    //User=============
    const userName = document.getElementById("validationDefaultUsername");
    userName.addEventListener("input", function () {
        // localStorage.setItem("User", userName.value);
    });
    //localStorage==========================
    window.addEventListener("load", function () {
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");
        const storedEmail = localStorage.getItem("email");
        if (storedUsername) { inputNam.value = storedUsername; }
        if (storedPassword) { pass.value = storedPassword; }
        if (storedEmail) { emailInput.value = storedEmail; }
    });
}
formValidation();

////////////////////////////////// Sign Up ==========================>
    
const submitBtn = document.querySelector(".add-acount");
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const inputNam = document.querySelector(".username");
    const userName = document.getElementById("validationDefaultUsername");
    const emailInput = document.querySelector(".email");
    const pass = document.querySelector(".password");
    if (
        inputNam.value.trim() !== "" &&
        pass.value.trim() !== "" &&
        emailInput.value.trim() !== "" &&
        userName.value.trim() !== ""
    ) {
        let user = {
            name: inputNam.value,
            username: userName.value,
            email: emailInput.value,
            password: pass.value
        };
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let exists = users.find((u) => u.email === emailInput.value);
        if (exists) {
            alert("Email already exists");
            // window.location.href = "./sginup.html";
            return;
        }
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        console.log(users);

        window.location.href = "./pages/home.html";
    } else {
        alert("Please fill in all fields.");
    }
});
export default formValidation;
