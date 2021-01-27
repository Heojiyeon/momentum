const weather = document.querySelector(".js-weather");
const API_KEY = "5b2713a80b0719afcb2168d25f23c83d";
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        }).then(function(json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `Location: ${place}
            Temperature: ${temperature}'C`;
        });
    }

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function hadleGeoError() {
    console.log("cant acess geo lacation");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, hadleGeoError);

}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}
init();