const searchButton = document.getElementById("searchBtn");
const searchBar = document.getElementById("searchBar");

searchButton.addEventListener("click", () => {
  var movieName = searchBar.value;
  searchBar.value = '';
});

searchBar.addEventListener("keyup", () => {
  if (event.keyCode === 13) {
    event.preventDefault();
    var movieName = searchBar.value;
    var url = "movieInfoPage.html?movieName=" + encodeURIComponent(movieName);
    window.location.href = url;
    searchBar.value = '';
  }
});
