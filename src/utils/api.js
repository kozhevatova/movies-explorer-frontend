class Api {
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

  _saveMovie(jwt, country, director, duration,
    year, description, image, trailer, nameRU,
    nameEN, thumbnail, movieId) {
    return fetch(`${this.baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId
      })
    })
      .then((res) => this._getResponseData(res));
  }

  _deleteMovieFromSaved(jwt, movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
      .then((res) => this._getResponseData(res));
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

  changeSaveStatus(movieId, isSaved, jwt) {
    return isSaved ?
      this._saveMovie(jwt, movieId) :
      this._deleteMovieFromSaved(jwt, movieId);
  }
};

const api = new Api({
  baseUrl: "https://api.annakin.diploma.students.nomoredomains.monster"
});

export default api;