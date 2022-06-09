const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  UserInfo() {
    return fetch(this.url + `/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(handleResponse);
  }

  getInitialCards() {
    return fetch(this.url + `/cards`, {
      headers: this.headers,
    }).then(handleResponse);
  }

  updateUserInfom(input) {
    return fetch(this.url + `/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(input),
    }).then(handleResponse);
  }

  addCardApi(input) {
    return fetch(this.url + `/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(input),
    }).then(handleResponse);
  }

  deleteCardApi(data) {
    return fetch(this.url + `/cards/` + data, {
      method: "DELETE",
      headers: this.headers,
    }).then(handleResponse);
  }
  
  likeCardApi(id) {
    return fetch(this.url + `/cards/` + id + "/likes", {
      method: "PUT",
      headers: this.headers,
    }).then(handleResponse);
  }

  likeCardApiDrop(id) {
    return fetch(this.url + `/cards/` + id + "/likes", {
      method: "DELETE",
      headers: this.headers,
    }).then(handleResponse);
  }

  updateAvatarApi(avatar) {
    return fetch(this.url + `/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(avatar),
    }).then(handleResponse);
  }
}
