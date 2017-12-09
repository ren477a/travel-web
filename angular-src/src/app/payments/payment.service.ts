import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PaymentService {


  isDev = true;
  userId: String;

  constructor() { }

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
