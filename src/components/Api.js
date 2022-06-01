

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export class Api {
  constructor(config){
    this.url = config.url;
    this.headers = config.headers;
  }

  UserInfo() {
    return fetch(this.url + `/users/me`, {
      method: 'GET',
      headers: this.headers,
    })  
    .then(handleResponse)  
  }

  getInitialCards() {
    return fetch(this.url + `/cards`, {
      headers: this.headers
    })
    .then(handleResponse)   
  }

  updateUserInfom(input){
    return fetch(this.url + `/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(input)
    })  
    .then(handleResponse)  
  }

  addCardApi(input) {
    
    return fetch(this.url + `/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(input)
    })  
    .then(handleResponse)
  }

  deleteCardApi(id) {
    return fetch(this.url + `/cards/` + `${id}`,{
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(id)
    })
    .then(handleResponse)
    
  }


}
