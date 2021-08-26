import { BASE_URL_MOVIE } from "./MoviesApi";
import { defaultProp } from './constants';

class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getMovies(jwt) {
    return fetch(`${this.baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => this._getResponseData(res));
  }

  saveMovie(jwt, movie) {
    return fetch(`${this.baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        country: movie.country ? movie.country : defaultProp, 
        director: movie.director ? movie.director : defaultProp, 
        duration: movie.duration ? movie.duration : 0, 
        year: movie.year ? movie.year : 0, 
        description: movie.description ? movie.description : defaultProp, 
        image: movie.image.url ? BASE_URL_MOVIE + movie.image.url : movie.image, 
        trailer: movie.trailer ? movie.trailer : movie.trailerLink, 
        nameRU: movie.nameRU ? movie.nameRU : defaultProp, 
        nameEN: movie.nameEN ? movie.nameEN : defaultProp, 
        thumbnail: movie.thumbnail ? movie.thumbnail : BASE_URL_MOVIE + movie.image.formats.thumbnail.url, 
        movieId: movie.id
      })
    })
      .then((res) => this._getResponseData(res));
  }

  deleteMovieFromSaved(jwt, movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
      .then((res) => this._getResponseData(res));
  }

  toggleMovieSave(jwt, movie, movieId, isSaved) {
    return isSaved ? this.deleteMovieFromSaved(jwt, movieId) : this.saveMovie(jwt, movie);
  }

  getUserInfo(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => this._getResponseData(res));
  }

  updateUserInfo(jwt, email, name) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        email,
        name
      })
    })
      .then((res) => this._getResponseData(res));
  }
};

const mainApi = new MainApi({
  // baseUrl: "https://api.annakin.diploma.students.nomoredomains.monster"
  baseUrl: "https://localhost:3000"
});

export default mainApi;