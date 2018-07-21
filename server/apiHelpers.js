
const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../server/config.js');

const base = 'https://api.themoviedb.org/3';

// write out logic/functions required to query TheMovieDB.org
let getBadMovies = function(genre) {
  const endpoint = '/discover/movie'
  return axios.get(base + endpoint, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      sort_by: 'vote_average.asc',
      page: 1,
      with_genres: genre.id
    }
  })
  .catch((err) => {
    console.log('getBadMoviesHelper err: ' + err);
  });
}

let getGenres = function() {
  const endpoint = '/genre/movie/list';
  return axios.get(base + endpoint, {
    params: {
      api_key: API_KEY,
      language: 'en-US'
    }
  })
  .catch((err) => {
    console.log(err);
  });
}
// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover

// Don't forget to export your functions and require them within your server file
module.exports = {
  getBadMovies: getBadMovies,
  getGenres: getGenres
}