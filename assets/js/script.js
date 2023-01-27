$(function() {

  localStorage.clear();

  var searchForm = $("#searchForm");
  var searchInput = $("#citySearch");
  var citiesBtns = $("#citiesBtns");
  var history = $("#history");
  var weatherForecast = $("#weatherForecast");

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

    if (citySearch) {
      findCoordinates(citySearch);
      $("h2").removeClass("text-black");
      $("h2").addClass("text-white");
    } else {
      window.alert("Please input a city's name.");
    }
  });

  function findCoordinates(citySearch) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&limit=1&appid=${key}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        
        if (citySearch && citiesStorage.includes(citySearch) === false) {
          createBtn(citySearch);
          citiesStorage.push(citySearch);
          localStorage.setItem("cities", JSON.stringify(citiesStorage));
        }

        currentWeather(lat, lon);
        futureWeather(lat, lon);
        weatherForecast.show("fold", 2000);   
      })
      .catch (function(error) {
        window.alert("City not found!");
      });
      searchInput.val("");

  }

  function createBtn(citySearch) {
    var btn = $("<button>", {
      text: citySearch
    });
    
    btn.addClass("btn btn-secondary btn-lg btn-block w-100 mb-3");
    citiesBtns.prepend(btn);
  }

  function currentWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        showCurrentWeather(data);
      })
  };

  function showCurrentWeather(data) {
    var temp = $("#temp")[0];
    var wind = $("#wind")[0];
    var humidity = $("#humidity")[0];
    var todaysDate = $("#todaysDate")[0];
    var today = dayjs();

    city.innerHTML = data.name;
    todaysDate.innerHTML = today.format('MM/DD/YYYY');
    $("#icon0")[0].src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    temp.innerHTML = "Temp: " + data.main.temp + "&#8451;";
    wind.innerHTML = "Wind: " + data.wind.speed + " m/s";
    humidity.innerHTML = "Humidity: " + data.main.humidity + " %";

    var condition = data.weather[0].main;
    console.log(condition);

    switch (condition) {
      case "Snow":
        $("#wrapper-bg").css("background-image", "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')");
        break;
      case "Clouds":
        $("#wrapper-bg").css("background-image", "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')");
        break;
      case "Fog", "Mist":
        $("#wrapper-bg").css("background-image", "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')");
        break;
      case "Rain", "Drizzle":
        $("#wrapper-bg").css("background-image", "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')");
        break;
      case "Clear":
        $("#wrapper-bg").css("background-image", "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')");
        break;
      case "Thunderstorm":
        $("#wrapper-bg").css("background-image", "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')");
        break;
      default:
        $("#wrapper-bg").css("background-image", "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')");
        break;
    }
  }

  function futureWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        showFutureWeather(data);
      })
  }

  function showFutureWeather(data) {
    for (var i = 1; i < 6; i++) {
      $("#day" + i + "Title")[0].innerHTML = dayjs().add(i, 'd').format("MM/DD/YYYY");
      $("#icon" + i)[0].src = "http://openweathermap.org/img/wn/" + data.list[i - 1].weather[0].icon + "@2x.png";
      // console.log($("#icon" + i)[0].src)
      $("#temp" + i)[0].innerHTML = "Temp: " + data.list[i - 1].main.temp + "&#8451;";
      $("#wind" + i)[0].innerHTML = "Wind: " + data.list[i - 1].wind.speed + " m/s";
      $("#humidity" + i)[0].innerHTML = "Humidity: " + data.list[i - 1].main.humidity + " %";
    }
  }

  history.on('click', searchAgain)
  function searchAgain(event) {
    event.preventDefault();
    findCoordinates(event.target.innerHTML)
  }

});