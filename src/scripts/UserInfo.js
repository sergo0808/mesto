export class UserInfo {
  constructor({name, job}){
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
     return {
      name: this._name.textContent,
      job: this._job.textContent  
     }
  };
  
  setUserInfo(profileNameInput, profileJobInput) {
    this._name.textContent = profileNameInput.value ;
    this._job.textContent = profileJobInput.value;
  }
}