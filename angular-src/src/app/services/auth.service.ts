import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

	authToken: any;
	user: any;
	isDev: boolean;

  constructor(private http: Http) {
  	this.isDev = false; //change to false before deploying
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
    return user;
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  // Looks for a token in local storage and checks if expired
  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  prepEndpoint(ep) {
  	if(!this.isDev)
  		return ep;
  	else
  		return 'http://localhost:8080/' + ep;
  }

}
