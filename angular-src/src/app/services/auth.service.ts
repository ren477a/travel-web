import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

	authToken: any;
	user: any;
  isDev: boolean;
  userType: String;
  jwtHelper: JwtHelper;

  constructor(private http: Http) {
    this.isDev = false; //change to false before deploying
    this.jwtHelper = new JwtHelper();
  }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/auth/register');
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/auth/authenticate');
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
  }

  // Store token and userID
  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getLoggedInUser() {
    const user = JSON.parse(localStorage.getItem('user'))
    if(tokenNotExpired())
      return user;
    return undefined;
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  getUserType() {
    this.loadToken();
    let token = this.jwtHelper.decodeToken(this.authToken);
    return token.data.type;
  }

  // loggedOut() {
  //   this.programmingFail();
  //   if(this.userType === undefined) {
  //     return true;
  //   }
  //   return false;
  // }

  userLoggedIn() {
    return tokenNotExpired && this.userType === 'user';
  }

  agencyLoggedIn() {
    return tokenNotExpired && this.userType === 'agency';    
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    this.userType = undefined;
    localStorage.clear();
  }

  prepEndpoint(ep) {
  	if(!this.isDev)
  		return ep;
  	else
  		return 'http://localhost:8080/' + ep;
  }

}
