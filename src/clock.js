const clockContainer = document.querySelector(".js_clock"),
      clockTitle = clockContainer.querySelector("h1");


function getTime() {
    const date = new Date();
    const localTime = date.toLocaleTimeString();
    clockTitle.innerHTML = localTime;
}

function init() {
    getTime();
    setInterval(getTime,1000);
}

init();