const form = document.querySelector(".JS-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".JS-greeting");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello, ${text} !`;
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        //she is not
        askForName();
    } else {
        // she is
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}
init();