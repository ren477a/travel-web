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
    let ep = this.prepEndpoint('api/auth/user/register');
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
  }

  registerAgency(agency){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/auth/agency/register');
    return this.http.post(ep, agency,{headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/auth/user/login');
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
  }

  authenticateAgency(agency) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/auth/agency/login');
    return this.http.post(ep, agency,{headers: headers})
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
    let token = this.jwtHelper.decodeToken(this.authToken);
    delete token.data.user.password;
    return token.data.user;
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  getUserType() {
    this.loadToken();
    let token = this.jwtHelper.decodeToken(this.authToken);
    return token.data;
  }

  getLoggedInAgency() {
    this.loadToken();
    let token = this.jwtHelper.decodeToken(this.authToken);
    delete token.data.agency.password;
    return token.data.agency;
  }

  findAgencyById(id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/agencies/'+id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }


  userLoggedIn() {
    console.log()
    return tokenNotExpired() && this.getUserType().user;
  }

  agencyLoggedIn() {
    return tokenNotExpired() && this.getUserType().agency;    
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
