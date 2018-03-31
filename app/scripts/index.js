require("./locationInfo");
require("./tempHolder");
require("./weatherIcon");

const getLocation = () => {
    const geoOptions = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                reject,
                geoOptions
            );
        });
    } else {
        throw new Error();
    }
};

const makeApiRequest = cords => {
    const headers = new Headers();
    const requestParams = {
        method: "GET",
        headers: headers,
        mode: "cors",
        cache: "no-cache"
    };

    const myRequest = new Request(
        `https://fcc-weather-api.glitch.me/api/current?lat=${cords.lat}&lon=${
            cords.lon
        }`,
        requestParams
    );
    return fetch(myRequest);
};

const parseResponse = data => {
    let details = {};
    details.country = data.sys.country;
    details.city = data.name;
    details.temp = data.main.temp;
    details.description = data.weather[0].main;
    return details;
};

const getWeather = cords => {
    return new Promise(resolve => {
        makeApiRequest(cords)
            .then(result => result.json())
            .then(data => {
                resolve(parseResponse(data));
            })
            .catch(() => console.log("Somehting went wrong!"));
    });
};

const fn = async () => {
    const preloader = document.getElementById("preloader");
    try {
        const location = await getLocation();
        const weather = await getWeather(location);
        const app = document.getElementById("app");

        const locationInfo = document.createElement("location-info");
        locationInfo.data = weather;

        const tempHolder = document.createElement("temp-holder");
        tempHolder.isCelsius = true;
        tempHolder.temp = weather.temp;

        const weatherIcon = document.createElement("weather-icon");
        weatherIcon.weather = weather.description;

        preloader.remove();
        app.appendChild(locationInfo);
        app.appendChild(tempHolder);
        app.appendChild(weatherIcon);
    } catch (e) {
        preloader.innerHTML =
            "Something went wrong! Probably we were not able to get your location!<br/>" +
            "There is a message in your console.";
        console.log(e);
    }
};

document.addEventListener("DOMContentLoaded", fn(), false);
