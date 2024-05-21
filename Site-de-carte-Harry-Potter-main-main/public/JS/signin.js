const emailSign = document.getElementById("emailLogSign");
const pseudoSign = document.getElementById("pseudoSign");
const passwordSign = document.getElementById("passwordLogSign");
const password2Sign = document.getElementById("passwordLogSign2");
const formSign = document.querySelector(".Inscription")

formSign.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (password2Sign.value !== passwordSign.value) {
        alert("Passwords do not match");
        return;
    }

    const response = await fetch("/users", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: emailSign.value,
        name: pseudoSign.value,
        password: passwordSign.value,
        }),
    });
    const data = await response.json();
    
})