const loginBtn = document.querySelector(".btn-login");
loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const emailInput = document.querySelector(".email");
    const passInput = document.querySelector(".password");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((user) => {
        return (
            user.email === emailInput.value &&
            user.password === passInput.value
        );
    });
    if (foundUser) {
        localStorage.setItem("isLogin", true);
        alert("Login Success");
        window.location.href = "./pages/home.html";
    } else {
        alert("Invalid Email or Password");
    }
});