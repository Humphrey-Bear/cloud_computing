const express = require('express');
const https = require('https');
const logger = require('morgan');
const router = express.Router();

router.use(logger('tiny'));

router.get('/', (req, res) => {
  const str =  '<!DOCTYPE html>' +
      '<html><head><title>Flickr Demo</title></head>' +
      '<body>' +
          '<h1>' + 'Recommended Movies' + '</h1>' +
          'Usage: http://localhost:3000/search/query/number <br>' +
          '<ul>' + '<li>query - corresponds to Flickr tags</li>'
                 + '<li>number - max number of results returned</li>'
                 + '<li>Example: <a href="http://localhost:3000/search/golden-retriever/100">http://localhost:3000/search/golden-retriever/100</a></li>'
          '<ul>' +
      '</body></html>';

  res.writeHead(200,{'content-type': 'text/html'});
  res.write(str);
  res.end();
});

const flickr = {
  method: 'flickr.photos.search',
  api_key: 'd7c5ed53dbac27b9652be1113fee6b8e',
  format: 'json',
  media: 'photos',
  nojsoncallback: 1
};

function createFlickrOptions(query, number) {
  const options = {
    hostname: 'api.flickr.com',
    port:443,
    path: '/services/rest/?',
    method: 'GET'
  }

  const str = 'method=' + flickr.method +
          '&api_key=' + flickr.api_key +
          '&tags=' + query +
          '&per_page=' + number +
          '&format=' + flickr.format +
          '&media' + flickr.media +
          '&nojsoncallback=' + flickr.nojsoncallback;
  options.path += str;
  return options;
}

//Various font sizes used to fit URL on screen
function parsePhotoRsp(rsp) {
  let s = "";

  for (let i=0; i < rsp.photos.photo.length; i++) {
      photo = rsp.photos.photo[i];
      t_url = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "t.jpg";
      p_url = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
      s +=  '<a href="' + p_url + '">' + '<img alt="'+ photo.title + '"src="' + t_url + '"/>' + '</a>';
  }

  return s;
}

function createPage(title, rsp) {
  const number = rsp.photos.photo.length;
  const imageString = parsePhotoRsp(rsp);

  //Headers and opening body, then main content andd close
  const str = '<!DOCTYPE html>' +
      '<html><head><title>Flickr JSON</title></head>' +
      '<body>' +
      '<h1>' + title + '</h1>' +
      'Total number of entries is: ' + number + '</br>' +
      imageString +
      '</body></html>';
    return str;
}

module.exports = router;
