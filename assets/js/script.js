$(function() {

  var searchForm = $("#searchForm");
  var searchInput = $("#citySearch");
  var citiesBtns = $("#citiesBtns")

  var citiesStorage = localStorage.getItem("cities") || [];

  searchForm.on('submit', function(event) {
    event.preventDefault();
    var searchInputEl = searchInput.val();

    if (searchInputEl && citiesStorage.includes(searchInputEl) === false) {
      var btn = $("<button>", {
        text: searchInputEl
      });
      btn.addClass("btn btn-secondary btn-lg btn-block w-100 mb-3");
      citiesBtns.prepend(btn);
      citiesStorage.push(searchInputEl);

      localStorage.setItem("Cities", JSON.stringify(citiesStorage));
    }
  });
});