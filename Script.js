// This function fetches weather data and updates the page
function fetchWeather(city) {
  const apiKey = '8070aca63a743552162c02ecef1367a7'; // <<<--- Your API Key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  // Display loading text
  const weatherDiv = document.getElementById('weatherResult');
  weatherDiv.innerHTML = "Loading...";

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found.");
      }
      return response.json();
    })
    .then(data => {
      // Extract data
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      // Update HTML
      weatherDiv.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${iconUrl}" alt="${desc}" />
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Description:</strong> ${desc}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
      `;
    })
    .catch(error => {
      weatherDiv.innerHTML = error.message;
    });
}

// Attach event listener to button
document.getElementById('searchButton').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (city === "") {
    document.getElementById('weatherResult').innerHTML = "Please enter a city name.";
    return;
  }
  fetchWeather(city);
});

// Optional: allow pressing Enter to search
document.getElementById('cityInput').addEventListener('keypress', (event) => {
  if (event.key === "Enter") {
    document.getElementById('searchButton').click();
  }
});
