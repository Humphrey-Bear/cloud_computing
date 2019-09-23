const searchBar = document.getElementById("searchBar");
const moviePoster = document.getElementById("moviePoster");
const movieTitle = document.getElementById("movieTitle");
const moviePlot = document.getElementById("moviePlot");
const directorName = document.getElementById("directorName");
const writerName = document.getElementById("writerName");
const starNames = document.getElementById("starNames");
const imdb = document.getElementById("IMDBRating");
const rottenTomatoes = document.getElementById("rottenRating");
const metacritic = document.getElementById("metaRating");
const recommendations = document.getElementById("recommendations");
const recommendation = document.getElementsByClassName("recommendation");
const similarMoviesTitle = document.getElementById("similarMoviesTitle");

const recommendation1 = document.getElementById("recommendation1");
const recommendation2 = document.getElementById("recommendation2");
const recommendation3 = document.getElementById("recommendation3");
const recommendation4 = document.getElementById("recommendation4");

var queryString = new Array();
window.onload = function () {
  if (queryString.length == 0) {
    if (window.location.search.split('?').length > 1) {
      var params = window.location.search.split('?')[1].split('&');
      for (var i = 0; i < params.length; i++) {
        var key = params[i].split('=')[0];
        var value = decodeURIComponent(params[i].split('=')[1]);
        queryString[key] = value;
      }
    }
  }
  retrieveMovieInfo(queryString["movieName"]);
};

searchBar.addEventListener("keyup", () => {
  if (event.keyCode === 13) {
    event.preventDefault();
    retrieveMovieInfo(searchBar.value);
    searchBar.value = '';
  }
});
//retrieveMovieInfo("her");

recommendation1.addEventListener("click", () => {
  var movieName = recommendation1.children[1].innerHTML.slice(0, length - 7);
  retrieveMovieInfo(movieName);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

recommendation2.addEventListener("click", () => {
  var movieName = recommendation2.children[1].innerHTML.slice(0, length - 7);
  retrieveMovieInfo(movieName);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

recommendation3.addEventListener("click", () => {
  var movieName = recommendation3.children[1].innerHTML.slice(0, length - 7);
  retrieveMovieInfo(movieName);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

recommendation4.addEventListener("click", () => {
  var movieName = recommendation4.children[1].innerHTML.slice(0, length - 7);
  retrieveMovieInfo(movieName);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

recommendation5.addEventListener("click", () => {
  var movieName = recommendation5.children[1].innerHTML.slice(0, length - 7);
  retrieveMovieInfo(movieName);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

recommendation6.addEventListener("click", () => {
  var movieName = recommendation6.children[1].innerHTML.slice(0, length - 7);
  retrieveMovieInfo(movieName);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

recommendation7.addEventListener("click", () => {
  var movieName = recommendation7.children[1].innerHTML.slice(0, length - 7);
  retrieveMovieInfo(movieName);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

recommendation8.addEventListener("click", () => {
  var movieName = recommendation8.children[1].innerHTML.slice(0, length - 7);
  retrieveMovieInfo(movieName);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

function retrieveMovieInfo(movieName) {
  document.getElementById("loader").style.display = "block";
  document.getElementById("moviePoster").style.display = "none";
  document.getElementById("movieInfo").style.display = "none";
  document.getElementById("movieRatings").style.display = "none";

  for (let i = 0; i < recommendation.length; i++) {
    recommendation[i].children[0].style.display = "none";
    recommendation[i].children[1].style.display = "none";
    recommendation[i].children[2].style.display = "none";
  }

  getMovieInfo(movieName);

  var delayInMilliseconds = 8000; //8 seconds

  setTimeout(function() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("moviePoster").style.display = "block";
    document.getElementById("movieInfo").style.display = "block";
    document.getElementById("movieRatings").style.display = "block";

    for (let i = 0; i < recommendation.length; i++) {
      recommendation[i].children[0].style.display = "block";
      recommendation[i].children[1].style.display = "block";
      recommendation[i].children[2].style.display = "block";
    }

  }, delayInMilliseconds);
}


function getMovieInfo(movieName, movieType) {
  fetch("http://127.0.0.1:3000/search/" + movieName)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(result) {
      //moviePoster.src = result.Poster;


      if (result.Title !== undefined) {
        movieTitle.innerHTML = result.Title + ' (' + result.Year + ')';
      } else {
        movieTitle.innerHTML = "Sorry, we couldn't find that movie.";
        moviePlot.innerHTML = "";
        directorName.innerHTML = "";
        writerName.innerHTML = "";
        starNames.innerHTML = "";
        similarMoviesTitle.innerHTML = "";
        imdb.innerHTML = "";
        rottenTomatoes.innerHTML = "";
        metacritic.innerHTML = "";
        moviePoster.src = "";
        return;
      }

      moviePlot.innerHTML = result.Plot;
      directorName.innerHTML = result.Director;
      writerName.innerHTML = result.Writer;
      starNames.innerHTML = result.Actors;

      //Edit the "Similar Movies" header below the featured movie.
      similarMoviesTitle.innerHTML = "If you liked " + result.Title
      + ", you might like these movies:";


      //Get and assign the ratings for the recommended movies. Some ratings are
      //missing in the json however and need to be caught if the variable cannot
      //be found and is undefined.
      try {
        imdb.innerHTML = result.Ratings[0].Value;
      } catch(e) {
        imdb.innerHTML = "N/A";
      }

      try {
        rottenTomatoes.innerHTML = result.Ratings[1].Value;
      } catch(e) {
        rottenTomatoes.innerHTML = "N/A";
      }

      try {
        metacritic.innerHTML = result.Ratings[2].Value;
      } catch(e) {
        metacritic.innerHTML = "N/A";
      }

      //Some movies do not have poster links in the json, so must catch error
      //if poster is undefined.
      try {
        moviePoster.src = result.Poster;
      } catch(e) {

      }


      //Update Movie Recommendations
      for (let i = 0; i < result.SimilarMovies.length; i++) {
        //Some movies do not have poster links in the json, so must catch error
        //if poster is undefined.
        try {
          recommendations.children[i].children[0].src = result.SimilarMovies[i].Poster;
        } catch(e) {

        }

        recommendations.children[i].children[1].innerHTML = result.SimilarMovies[i].Title
         + " (" + result.SimilarMovies[i].Year + ")";

        //Get and assign the ratings for the recommended movies. Some ratings are
        //missing in the json however and need to be caught if the variable cannot
        //be found and is undefined.
        try {
          recommendations.children[i].children[2].children[0].children[1].innerHTML = result.SimilarMovies[i].Ratings[0].Value;
        } catch(e) {
          recommendations.children[i].children[2].children[0].children[1].innerHTML = "N/A";
        }

        try {
          recommendations.children[i].children[2].children[1].children[1].innerHTML = result.SimilarMovies[i].Ratings[2].Value;
        } catch(e) {
          recommendations.children[i].children[2].children[1].children[1].innerHTML = "N/A";
        }

        try {
          recommendations.children[i].children[2].children[2].children[1].innerHTML = result.SimilarMovies[i].Ratings[1].Value;
        } catch(e) {
          recommendations.children[i].children[2].children[2].children[1].innerHTML = "N/A";
        }
      }
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ', error.message);
    });
}
