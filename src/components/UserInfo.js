export class UserInfo {
  constructor(selectorName, selectorJob){
    this._name = selectorName;
    this._job = selectorJob;
  }

  getUserInfo() {
       this._user = {}
       this._user.name = this._name.textContent,
       this._user.job = this._job.textContent 

     return this._user
  };
  
setUserInfo(name, job) {
    this._name.textContent =  name;
    this._job.textContent = job;
  }
}