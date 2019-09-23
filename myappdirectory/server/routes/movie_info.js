const express = require('express');
const https = require('https');
const axios = require('axios');
const logger = require('morgan');
const router = express.Router();

//Create global variable for queried movie
var movieTitle;

router.use(logger('tiny'));

router.get('/:query', (req, res) => {

  const options = createOMDBOptions(req.params.query);

  const url = `https://${options.hostname}${options.path}`;

  axios.get(url)
      .then((response) => {
        return response.data;
      })
      .then((rsp) => getMovieRecommendations(rsp, res))
      .catch((error) => {
          console.error(error);
      })
});

function getMovieRecommendations(movieInfo, res) {

  const options = createTasteDiveOptions(movieInfo.Title);

  const url = `https://${options.hostname}${options.path}`;

  var recommendedMoviesInfo = [];

  axios.get(url)
      .then((response) => {
          //res.writeHead(response.status,{'content-type': 'text/html'});
          return response.data;
      })
      .then((rsp) => getMovieRecommendationsInfo(movieInfo, res, rsp))
      .catch((error) => {
          //console.error(error);
      })
}

function getMovieRecommendationsInfo(movieInfo, res, movieRecommendations) {
    const getRecommendedMoviesInfo = (index) => {
      return new Promise((resolve, reject) => {
        axios.get(`https://www.omdbapi.com/?t=${movieRecommendations.Similar.Results[index].Name}&type=movie&apikey=63f4fe06`)
            .then((response) => {
              return response.data;
            })
            .then((rsp) => {
              return resolve(rsp);
            })
            .catch((error) => {
              //return reject(error.message);
            })
        })
    }

    const getInfo = async() => {
      var info = this;
      info.response = [];
      for (let i = 0; i < 8; i++) {
        await getRecommendedMoviesInfo(i).then((recommendedMovieInfo) => {
          info.response[i] = recommendedMovieInfo;
        }).catch((error) => {
          console.error(error);
        })
      }
      movieInfo.SimilarMovies = info.response;
      res.json(movieInfo);
    }
  getInfo();
}

function condenseMovieInfo(movieInfo) {
  var condensedMovieInfo = {
    "Title":movieInfo.Title,
    "Year":movieInfo.Year,
    "Plot":movieInfo.Plot,
    "Director":movieInfo.Director,
    "Writer":movieInfo.Writer,
    "Actors":movieInfo.Actors,
    "Poster":movieInfo.Poster,
    "Ratings": [
      {"Source":movieInfo.Ratings[0].Source, "Value":movieInfo.Ratings[0].Value},
      {"Source":movieInfo.Ratings[1].Source, "Value":movieInfo.Ratings[1].Value},
      {"Source":"Metacritic", "Value":movieInfo.Metascore + "/100"}
    ],
    "Response":movieInfo.Response
  };

  return condensedMovieInfo;
}

function createOMDBOptions(query) {
  const options = {
    hostname: 'www.omdbapi.com',
    port:443,
    path: '/?',
    method: 'GET'
  }

  const str = 't=' + query + '&type=movie&apikey=63f4fe06';
  options.path += str;
  return options;
}

function createTasteDiveOptions(query) {
  const options = {
    hostname: 'tastedive.com',
    port:443,
    path: '/api/similar?',
    method: 'GET'
  }

  const str = 'q=' + query + '&type=movies&k=344623-APImashu-DTP5R2GI&limit=8';
  options.path += str;
  return options;
}

module.exports = router;
