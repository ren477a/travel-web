import { Component, OnInit, HostListener, Input } from '@angular/core';
import { PaymentService } from '../payment.service';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {

  //Use input tag @Input to inject value from parent
  //Checkout flow
  //Enter quantity and payment method
  //Show terms and conditions
  //If user agree
  //Enter payment details
  //Charge the client
  //Generate vouchers
  //Redirect to myvouchers
  isDev: boolean;
  handler: any;
  amount: number;
  stripeKey = 'pk_test_qADbc5GgnhosvOHTGr5p581D';
  @Input() quantity: number;
  @Input() tour: any;
  @Input() user: any;
  result: any;

  constructor(
    private paymentService: PaymentService,
    private http: Http,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.isDev = true; //Change on prod
    this.amount = this.quantity * this.tour.price * 100;
    this.handler = StripeCheckout.configure({
      key: this.stripeKey,
      image: '../../../../assets/travel.png',
      currency: 'php',
      locale: 'auto',
      email: this.user.email,
      allowRememberMe: false,
      token: token => {
        this.paymentService.processPayment(token, this.amount);
        this.router.navigate(['/confirmation']);
      }
    });
  }

  handlePayment() {
    this.handler.open({
      name: 'Travel Catalog',
      amount: this.amount
    });
  }


  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close()
  }

  prepEndpoint(ep) {
  	if(!this.isDev)
  		return ep;
  	else
  		return 'http://localhost:8080/' + ep;
  }

}
