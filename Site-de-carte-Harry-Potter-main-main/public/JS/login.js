const email = document.getElementById("emailLog");
const password = document.getElementById("passwordLog");
const form = document.querySelector(".Connexion")

email.addEventListener("input", (e) => {
    localStorage.setItem("email", e.target.value);
});

window.onload = function() {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
        email.value = storedEmail;
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await fetch("/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: email.value,
        password: password.value,
        }),
    });
    const data = await response.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email.value);
        window.location.href = "/users_DisplayProfile.html";
    }
    else {
        alert("Invalid email or password");
    }
})