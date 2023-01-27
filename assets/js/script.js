$(function() {

    // clear storage
  localStorage.clear();

  // global variables selected
  var searchForm = $("#searchForm");
  var searchInput = $("#citySearch");
  var citiesBtns = $("#citiesBtns");
  var history = $("#history");
  var weatherForecast = $("#weatherForecast");
  var city = $("#city")[0];
  var key = "e37962da806ca348cd44055871a41a14";
  
  // getting stuff from local storage for cities
  var citiesStorage = localStorage.getItem("cities");

  // create or add to an array
  if (citiesStorage) {
    citiesStorage = JSON.parse(citiesStorage)
  } else {
    citiesStorage = [];
  }

  // create a button if city name exists using the function findCoordinates
  citiesStorage.forEach(createBtn);

  searchForm.on('submit', function(event) {
    event.preventDefault();
    var citySearch = searchInput.val();

    if (citySearch) {
      findCoordinates(citySearch);
    } else {
      alert("Please input a city's name.");
    }
  });

  // find the coordinates of the city name by fetching from open Weather api, pushing them into storage if it is not already there and checking if city exists
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
        weatherForecast.show("fold", 1000);   
      })
      .catch (function(error) {
        alert("City not found!");
      });
      searchInput.val("");
  }

  // create buttons for the existing cities
  function createBtn(citySearch) {
    var btn = $("<button>", {
      text: citySearch
    });
    
    btn.addClass("btn btn-secondary btn-lg btn-block w-100 mb-3 d-flex justify-content-center");
    citiesBtns.prepend(btn);
  }

  // function to find the current weather using latitude and longitude
  function currentWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        showCurrentWeather(data);
      })
  };

  // function to display the current weather 
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

    // switch the background image between different conditions
    switch (condition) {
      case "Snow":
        $("#wrapper-bg").css("background-image", "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')");
        $("h2").removeClass("text-black");
        $("h2").addClass("text-white");
        break;
      case "Clouds":
      case "Mist":
        $("#wrapper-bg").css("background-image", "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')");
        $("h2").removeClass("text-black");
        $("h2").addClass("text-white");
        break;
      case "Fog":
        $("#wrapper-bg").css("background-image", "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')");
        $("h2").removeClass("text-white");
        $("h2").addClass("text-black");
        break;
      case "Rain":
      case "Drizzle":
        $("#wrapper-bg").css("background-image", "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')");
        $("h2").removeClass("text-black");
        $("h2").addClass("text-white");
        break;
      case "Clear":
        $("#wrapper-bg").css("background-image", "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')");
        $("h2").removeClass("text-white");
        $("h2").addClass("text-black");
        break;
      case "Thunderstorm":
        $("#wrapper-bg").css("background-image", "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')");
        $("h2").removeClass("text-black");
        $("h2").addClass("text-white");
        break;
      default:
        $("#wrapper-bg").css("background-image", "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')");
        $("h2").removeClass("text-white");
        $("h2").addClass("text-black");
        break;
    }
  }

  // function to get the future 5-day forecast
  function futureWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        showFutureWeather(data);
      })
  }

  // function to show the 5-day forecast
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

  // click event to search the same city again if button are created already
  history.on('click', searchAgain)

  // function to search the city with its own button
  function searchAgain(event) {
    event.preventDefault();
    findCoordinates(event.target.innerHTML)
  }
});