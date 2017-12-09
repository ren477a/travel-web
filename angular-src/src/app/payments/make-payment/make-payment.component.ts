import { Component, OnInit, HostListener } from '@angular/core';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {

  handler: any;
  amount = 500;
  stripeKey = 'pk_test_qADbc5GgnhosvOHTGr5p581D';

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: this.stripeKey,
      currency: 'php',
      locale: 'auto',
      email: 'asd@asd.com',
      allowRememberMe: false,
      token: token => {
        this.paymentService.processPayment(token, this.amount)
        console.log(token);
      }
    });
  }

  handlePayment() {
    this.handler.open({
      name: 'Travel Catalog',
      excerpt: 'Pay with Card',
      amount: this.amount
    });
  }
  @HostListener('window:popstate')
    onPopstate() {
      this.handler.close()
    }

}
