$(function() {

  var searchForm = $("#searchForm");
  var searchInput = $("#citySearch");
  var citiesBtns = $("#citiesBtns");
  var windEl = $("#wind");

  var key = "e37962da806ca348cd44055871a41a14";
  var KtoC = -273.15;

  var citiesStorage = localStorage.getItem("cities");

  if (citiesStorage) {
    citiesStorage = JSON.parse(citiesStorage)
  } else {
    citiesStorage = [];
  }

  citiesStorage.forEach(createBtn);

  searchForm.on('submit', function(event) {
    event.preventDefault();
    var citySearch = searchInput.val();

    if (citySearch && citiesStorage.includes(citySearch) === false) {
      createBtn(citySearch);
      citiesStorage.push(citySearch);

      localStorage.setItem("cities", JSON.stringify(citiesStorage));
    }
    searchInput.val("");
    findCoordinates(citySearch);
  });

  function createBtn(citySearch) {
    var btn = $("<button>", {
      text: citySearch
    });
    btn.addClass("btn btn-secondary btn-lg btn-block w-100 mb-3");
    citiesBtns.prepend(btn);
  }

  function findCoordinates(citySearch) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&limit=1&appid=${key}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        currentWeather(latitude, longitude);
        weatherForecast(latitude, longitude);
      })
  }

  function currentWeather(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        city.innerHTML = data.name;
        temp.innerHTML = "Temp: " + data.main.temp + " &#8451";
        wind.innerHTML = "Wind: " + data.wind.speed + " m/s";
        humidity.innerHTML = "Humidity: " + data.main.humidity + "%";
      })
  };

  function weatherForecast(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);

        day1.innerHTML = data.city.name;
      })
  };
});