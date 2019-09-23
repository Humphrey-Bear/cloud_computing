const express = require('express');
const movieInfoRouter = require('./routes/movie_info');
const movieRecommendationsRouter = require('./routes/movie_recommendations');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
/*
const hostname = '127.0.0.1';
const port = 3000;
*/
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    const str =  '<!DOCTYPE html>' +
        '<html><head><title>Movie Database Utilisation</title></head>' +
        '<body>' +
            '<h1>' + 'The Movie Info Viewer' + '</h1>' +
            'Usage: http://localhost:3000/search/movie_name <br>' +
            '<ul>' + '<li>movie_name - The name of the movie to get info and recommendations for.</li>'
                   + '<li>Example: <a href="http://localhost:3000/search/The Shawshank Redemption">http://localhost:3000/search/The Shawshank Redemption</a></li>'
            '<ul>' +
        '</body></html>';

    res.writeHead(200,{'content-type': 'text/html'});
    res.write(str);
    res.end();
});

app.use('/search?',movieInfoRouter);
//app.use('/recommended',movieRecommendationsRouter);
/*
app.listen(port, function () {
    console.log(`Express app listening at http://${hostname}:${port}/`);
});*/

module.exports = app;
