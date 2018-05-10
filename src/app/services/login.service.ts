import { Injectable } from '@angular/core';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(
    private _http: HttpClient,
    private _config: Config
  ) { }
  twitch(){
    const options = {responseType: 'text' as 'text'};
    this._http.get(this._config.urls.twitchAPI + '19571641', options).subscribe(
      data => {
        console.log("twitch data: ", data);
      });
  }
  login() {
    var callback_uri, redirect_uri;
    callback_uri = escape(location.href).replace(/\//g,"%2F");
    redirect_uri = encodeURIComponent(this._config.urls.backend_url + "?token&scope=psn&callback_url=" + callback_uri);
    location.href = "https://auth.api.sonyentertainmentnetwork.com/2.0/oauth/authorize?" +
      "service_entity=urn:service-entity:psn&" +
      "response_type=code&" +
      "client_id=8227653b-ba4d-4bfa-a225-0aa3546fef51&" +
      "redirect_uri=" + redirect_uri + "&" +
      "scope=psn:s2s";
  };
  userinfo: UserInfo = {};
  updateUserInfo(token) {
    let scope = this;
  
//    headers.append('Authorization', 'Token token=' + token);

    this._http.get(this._config.urls.backend_url + "?profile&scope=psn").subscribe(
      data => {
        console.log("data: ", data);
        if (data['status'] === "ok") {
          let key: string;
          scope.userinfo = data;
          scope.userinfo.token = token;
          if (scope.userinfo.first_name === null) {
            scope.userinfo.first_name = "";
          }

          if (scope.userinfo.last_name === null) {
            scope.userinfo.last_name = "";
          }

          if (scope.userinfo.profile_url === null) {
            scope.userinfo.profile_url = "";
          }

          if (scope.userinfo.avatar_url === null) {
            scope.userinfo.avatar_url = "";
          }

          localStorage.setItem('authToken', token);

          key = "currentUser";
          if (this._config.urls.backend_url.indexOf('dev') === -1) {
            key = "currentUser-dev";
          }
          localStorage.setItem(key, JSON.stringify(scope.userinfo));
          console.log('logged into psn');
          //$rootScope.psnLoginComplete();
        } else {
          scope.userinfo = {};
          localStorage.setItem('authToken', '');
          console.log('NOT logged into psn');
        }
      },
      error => {console.log('login error in updateUserInfo')},
      () => {}
    );
  };
}
interface UserInfo{
  first_name?;
  last_name?;
  profile_url?;
  avatar_url?;
  token?;
  is_psn_member?;
}