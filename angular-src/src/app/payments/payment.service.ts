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
    this.isDev = false;
  }

  submitPayment(tour: any, user: Object, quantity: number) {
    this.tour = tour;
    this.user = user;
    this.quantity = quantity;
  }

  processPayment(token: any, amount: number) {
    const payment = { token, amount };
    const data = {
      token: token,
      quantity: this.quantity,
      userId: this.user.id,
      tour: this.tour,
      amount: amount
    }
    //headers.set('Content-Type','application/json');
    let ep = this.prepEndpoint('api/payment/charge');
    this.http.post(ep, data).subscribe(result => {
      let resultObj: any;
      resultObj = result;
      if(resultObj.success) {
        console.log(this.tour);
        let data = {
          tourId: this.tour._id,
          tourTitle: this.tour.title,
          agency: this.tour.agency,
          quantity: this.quantity,
          pricePerItem: this.tour.price,
          total: resultObj.charge.amount / 100,
          customerId: this.user._id,
          customerEmail: this.user.email,
          paymentType: "card",
          paymentId: resultObj.charge.id,
          voucherCodes: [],
          claimed: false
        }
        console.log(data)
        let ep = this.prepEndpoint('api/payment/transaction');
        this.http.post(ep, data).subscribe(res => {
          console.log(res);
        });
      }
      
    });
    // Navigate to success page show receipt
  }

  

  prepEndpoint(ep) {
  	if(!this.isDev)
  		return ep;
  	else
  		return 'http://localhost:8080/' + ep;
  }

}
