import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ToursService {

  isDev: boolean;

  constructor(private http: Http) { 
    this.isDev = false;
  }

  uploadPhoto(photo: File) {
    let data = new FormData();
    data.append('photo', photo);
    let ep = this.prepEndpoint('api/tours/upload');
    return this.http.post(ep, data,)
      .map(res => res.json());
  }

  addTour(tour){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/tours/');
    return this.http.post(ep, tour, {headers: headers})
      .map(res => res.json());
  }

  findTours(query, pageNum) {
    let headers = new Headers();
    if(query.sortBy) {
      if(query.sortBy === 'Price lowest to highest') {
        query.sortBy = {col:'price', asc: 1}
      } else if(query.sortBy === 'Price highest to lowest') {
        query.sortBy = {col:'price', asc: -1}
      } else if(query.sortBy === 'Alphabetical Order') {
        query.sortBy = {col:'title', asc: 1}
      } else if(query.sortBy === 'Newest First') {
        query.sortBy = undefined;
      }
    }
    let data = {
      query: query,
      pageNum: pageNum
    }
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/tours/search');
    return this.http.post(ep, data, {headers: headers})
      .map(res => res.json());
  }

  findFeatured() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/tours/featured');
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

  stopSelling(id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/tours/archive/' + id);
    return this.http.put(ep, {headers: headers})
      .map(res => res.json());
  }

  prepEndpoint(ep) {
  	if(!this.isDev)
  		return ep;
  	else
  		return 'http://localhost:8080/' + ep;
  }

}
