const cityInput = document.getElementById("incity");
const submitButton = document.getElementById("submit");
const resultDiv = document.getElementById("aftersubmit");
const apiKey = "193a6334444483733cccd116386478e7"; 
async function fetchWeather(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            if (response.status === 404) {
                alert("City not found. Please enter a valid city name.");
                return null;
            }
            throw new Error("Network response was not ok.");
        }

        const data = await response.json();

        if (!data.sys || !data.sys.country || data.name.toLowerCase() !== city.toLowerCase()) {
            alert("Please enter a valid city name.");
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching the weather data. Please try again.");
        return null;
    }
}

function getWeatherEmoji(weather) {
    switch (weather.toLowerCase()) {
        case "clear":
            return "☀️";
        case "clouds":
            return "☁️";
        case "rain":
            return "🌧️";
        case "snow":
            return "❄️";
        case "thunderstorm":
            return "⛈️";
        case "drizzle":
            return "🌦️";
        case "mist":
        case "fog":
            return "🌫️";
        default:
            return "🌍";
    }
}

function updateUI(data) {
    const weatherHTML = `
        <h2 id="city">${data.name}, ${data.sys.country}</h2>
        <h3 id="temp">${data.main.temp}°C</h3>
        <h4 id="humi">Humidity: ${data.main.humidity}%</h4>
        <h4 id="desc">${data.weather[0].description}</h4>
        <h4 id="emoji">${getWeatherEmoji(data.weather[0].main)}</h4>
    `;
    resultDiv.innerHTML = weatherHTML;
    resultDiv.style.display = "block";
}

submitButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();  


    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const data = await fetchWeather(city);
    if (data) {
        updateUI(data);
    }
});
