import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { Router } from '@angular/router';
import { MakePaymentComponent } from '../../payments/make-payment/make-payment.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tours: Array<any>;

  constructor(
    private toursService: ToursService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.toursService.findTours().subscribe(res => {
      this.tours = res;
    });
  }
}
