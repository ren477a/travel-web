import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../payment.service';
import { MakePaymentComponent } from '../make-payment/make-payment.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MakePaymentComponent],
  providers: [PaymentService],
  exports: [
    MakePaymentComponent
  ],
})

export class PaymentModule { }
