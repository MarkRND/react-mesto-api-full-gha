class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  _getHeaders() {
    const token = localStorage.getItem('token');
    return {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
      ...this._headers,
    };
  }
  getInfoUser() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._getHeaders(),
      
    }).then((res) => this._getResponseData(res));
  }

  getCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._getHeaders(),
     
    }).then((res) => this._getResponseData(res));
  }

  editUser(data) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  updateAvatar(link) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: link.avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }

  addCard(data) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((res) => this._getResponseData(res));
  }

  addLikeCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: this._getHeaders(),
    }).then((res) => this._getResponseData(res));
  }

  deleteLikeCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((res) => this._getResponseData(res));
  }
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.deleteLikeCard(cardId);
    } else {
      return this.addLikeCard(cardId);   
    }
  }
}

const api = new Api({
  baseUrl: "https://api.markus.nomoreparties.sbs"
}
);

export default api;