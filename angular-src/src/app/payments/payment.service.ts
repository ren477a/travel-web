import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';

@Injectable()
export class PaymentService {


  isDev = false;
  user: Object;
  tour: Object;
  quantity: number;

  constructor(
    private authService: AuthService
  ) { }

  submitPayment(tour: any, user: Object, quantity: number) {
    this.tour = tour;
    this.user = user;
    this.quantity = quantity;
  }

  processPayment(token: any, amount: number) {
    const payment = { token, amount };
    // let headers = new Headers();
    // headers.append('Content-Type','application/json');
    // let ep = this.prepEndpoint('api/auth/register');
    // return this.http.post(ep, user,{headers: headers})
    //   .map(res => res.json());
  }

  prepEndpoint(ep) {
  	if(!this.isDev)
  		return ep;
  	else
  		return 'http://localhost:8080/' + ep;
  }

}
