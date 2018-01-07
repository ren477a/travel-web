import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ToursService {

  isDev: boolean;

  constructor(private http: Http) { 
    this.isDev = false;
  }

  addTour(tour){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/tours/');
    return this.http.post(ep, tour,{headers: headers})
      .map(res => res.json());
  }

  findTours() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/tours');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  findTourById(id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/tours/' + id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  prepEndpoint(ep) {
  	if(!this.isDev)
  		return ep;
  	else
  		return 'http://localhost:8080/' + ep;
  }

}
