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

  // Done
  findTours(query, pageNum) {
    let headers = new Headers();
    if(query.sortBy) {
      if(query.sortBy === 'Price lowest to highest') {
        query.sort = 'price'
      } else if(query.sortBy === 'Price highest to lowest') {
        query.sort = '-price'
      } else if(query.sortBy === 'Alphabetical Order') {
        query.sort = 'title'
      } else if(query.sortBy === 'Newest First') {
        query.sort = '-date';
      }
    }
    headers.append('Content-Type','application/json');
    let qStr = '?page='+pageNum
    if(query.key) qStr += '&key=' + query.key
    if(query.min && query.max) qStr += '&min='+query.min+'&max='+query.max
    if(query.type) qStr += '&type=' + query.type
    if(query.sort) qStr += '&sort=' + query.sort
    if(query.agency) qStr += '&agency=' + encodeURIComponent(query.agency)
    if(query.status) qStr += '&status=' + query.status
    console.log(qStr)
    let ep = this.prepEndpoint(`api/tours${qStr}`);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  // Done
  findFeatured() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/tours?page=1&status=onsale');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  // Done
  findTourById(id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/tours/' + id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  findByAgency(id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/tours/' + id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  //
  stopSelling(id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let body = {
      status: 'notonsale'
    }
    let ep = this.prepEndpoint('api/tours/' + id);
    return this.http.put(ep, body, {headers: headers})
      .map(res => res.json());
  }

  prepEndpoint(ep) {
  	if(!this.isDev)
  		return ep;
  	else
  		return 'http://localhost:8080/' + ep;
  }

}
