import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class SessionService {

  baseUrl: string = environment.apiUrl;

  private loggedInSource = new Subject<any>();

  loggedIn$ = this.loggedInSource.asObservable();
  // app component will subscribe to "loggedIn$"

  constructor(
    private myHttp: Http
  ) { }

  loggedIn (userInfo) {
      this.loggedInSource.next(userInfo);
  }

  checkLogin() {
      return this.myHttp
        .get(
          this.baseUrl + '/api/checklogin',
          { withCredentials: true }
        )
        .toPromise()
        .then(res => res.json());
  }

  login(email, password) {
    return this.myHttp
      .post(
        this.baseUrl + '/api/login',
        {
          loginEmail: email,
          loginPassword: password
        },
        { withCredentials: true }
      )
      .toPromise()
      .then(res => res.json());
    }

    signup(userInfo) {
      return this.myHttp
        .post(
          this.baseUrl + '/api/signup',
          userInfo,
          { withCredentials: true }
        )
        .toPromise()
        .then(res => res.json());
  }

  logout() {
      return this.myHttp
        .post(
          this.baseUrl + '/api/logout',
          {},
          { withCredentials: true }
        )
        .toPromise()
        .then(res => res.json());
  }

  update(dataToSend) {
    console.log('data to send', dataToSend)
    return this.myHttp
      .post(`${this.baseUrl}/api/profile/edit`, dataToSend,
        { withCredentials: true }
      )
      .toPromise()
      .then(apiResponse => apiResponse.json())
  }

  getUsersList() {
      return this.myHttp
        .get(
          this.baseUrl + '/api/users',
          { withCredentials: true }
        )
        .toPromise()
        .then(res => res.json());
  }
}
