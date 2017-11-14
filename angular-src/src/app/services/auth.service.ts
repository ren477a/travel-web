import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

	authToken: any;
	user: any;
	isDev: boolean;

  constructor(private http: Http) {
  	this.isDev = true; //change to false before deploying
  }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('auth/register');
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
  }

  prepEndpoint(ep) {
  	if(!this.isDev)
  		return ep;
  	else
  		return 'http://localhost:8080/' + ep;
  }

}
