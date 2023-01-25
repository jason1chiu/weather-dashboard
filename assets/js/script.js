$(function() {

  var searchForm = $("#searchForm");
  var searchInput = $("#citySearch");
  var citiesBtns = $("#citiesBtns");
  var cityEl = $("#city");

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
        useCoordinates(latitude, longitude);
      })
  }

  function useCoordinates(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);

        city.innerHTML = data.name;
        tempInCelsius = (data.main.temp + KtoC).toFixed(2);
        console.log(tempInCelsius);
        temp.innerHTML = "Temp: " + tempInCelsius;
      })
  };

});