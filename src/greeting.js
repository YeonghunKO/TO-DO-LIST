const form = document.querySelector(".js_form"),
      input = form.querySelector("input"),
      greeting = document.querySelector(".js_greetings");


const USER_LS = "currentUser",
      SHOWING_CN = "showing";

function saveName(currentValue) {
    localStorage.setItem(USER_LS,currentValue);
}

function handSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Hello ${text} Hope you have a great day🤩`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}




function init() {
    loadName();
}

init();