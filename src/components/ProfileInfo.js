export class ProfileInfo {
  constructor(selectorName, selectorJob, selectorAvatar){
    this._name = selectorName;
    this._about = selectorJob;
    this._avatar = selectorAvatar;
  }

  getProfileInfo() {
       this._user = {}
       this._user.name = this._name.textContent,
       this._user.about = this._about.textContent,
       this._user.avatar = this._avatar

     return this._user
  };
  
setProfileInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
  setProfileAvatar(avatar) {
    this._avatar.src = avatar.avatar;
  }
}