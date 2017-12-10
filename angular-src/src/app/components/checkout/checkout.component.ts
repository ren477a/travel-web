import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../payments/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  tour: Object;
  user: Object;
  quantity: number;

  constructor(
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.tour = this.paymentService.tour;
    this.user = this.paymentService.user;
    this.quantity = this.paymentService.quantity;
  }

  onAcceptButtonClick() {
  }

}
