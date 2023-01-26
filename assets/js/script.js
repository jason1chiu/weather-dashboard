$(function() {

  var searchForm = $("#searchForm");
  var searchInput = $("#citySearch");
  var citiesBtns = $("#citiesBtns");


  var city = $("#city")[0];


  var key = "e37962da806ca348cd44055871a41a14";
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
        var lat = data[0].lat;
        var lon = data[0].lon;
        currentWeather(lat, lon);
        futureWeather(lat, lon);
      })
  }

  function currentWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data.weather[0].icon);
        showCurrentWeather(data);
      })
  };

  function showCurrentWeather(data) {
    var temp = $("#temp")[0];
    var icon = $("#icon").src;
    var wind = $("#wind")[0];
    var humidity = $("#humidity")[0];
    var todaysDate = $("#todaysDate")[0];
    var today = dayjs();

    city.innerHTML = data.name;
    todaysDate.innerHTML = today.format('MM/DD/YYYY');
    icon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    console.log(icon);
    temp.innerHTML = "Temp: " + data.main.temp + "&#8451;";
    wind.innerHTML = "Wind: " + data.wind.speed + " m/s";
    humidity.innerHTML = "Humidity: " + data.main.humidity + " %";
  }

  function futureWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        showFutureWeather(data);
      })
  }

  function showFutureWeather(data) {
    for (var i = 1; i < 6; i++) {
      $("#day" + i + "Title")[0].innerHTML = dayjs().add(i,'d').format("MM/DD/YYYY");
      $("icon" + i).src = "http://openweathermap.org/img/wn/" + data.list[i - 1].weather[0].icon + "@2x.png";
      $("#temp" + i)[0].innerHTML = "Temp: " + data.list[i - 1].main.temp + "&#8451;";
      $("#wind" + i)[0].innerHTML = "Wind: " + data.list[i - 1].wind.speed + " m/s";
      $("#humidity" + i)[0].innerHTML = "Humidity: " + data.list[i - 1].main.humidity + " %";
    }
  }

});