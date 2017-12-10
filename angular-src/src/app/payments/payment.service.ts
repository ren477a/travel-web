import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';

@Injectable()
export class PaymentService {


  isDev: boolean;
  user: any;
  tour: any;
  quantity: number;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { 
    this.isDev = true;
  }

  submitPayment(tour: any, user: Object, quantity: number) {
    this.tour = tour;
    this.user = user;
    this.quantity = quantity;
  }

  processPayment(token: any, amount: number) {
    const payment = { token, amount };
    console.log(token);
    const data = {
      token: token,
      quantity: this.quantity,
      userId: this.user.id,
      tour: this.tour,
      amount: amount
    }
    //headers.set('Content-Type','application/json');
    let ep = this.prepEndpoint('api/payment/charge');
    this.http.post(ep, data).subscribe();
  }

  prepEndpoint(ep) {
  	if(!this.isDev)
  		return ep;
  	else
  		return 'http://localhost:8080/' + ep;
  }

}
