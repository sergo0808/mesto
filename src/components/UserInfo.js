export class UserInfo {
  constructor(selectorName, selectorJob){
    this._name = selectorName;
    this._about = selectorJob;
  }

  getUserInfo() {
       this._user = {}
       this._user.name = this._name.textContent,
       this._user.about = this._about.textContent 

     return this._user
  };
  
setUserInfo(name, about) {
    this._name.textContent =  name;
    this._about.textContent = about;
  }
}