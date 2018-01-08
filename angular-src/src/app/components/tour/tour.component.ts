import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ToursService } from '../../services/tours.service';
import { PaymentService } from '../../payments/payment.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  tour: Object;
  tourId: String;
  quantity: number;
  imgUrl: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toursService: ToursService,
    private paymentService: PaymentService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.tourId = params.get('id');

      }
    );
    this.toursService.findTourById(this.tourId).subscribe(res => {
      this.tour = res.tour;
      this.imgUrl = res.imgUrl;
    },
      err => {
        console.log(err);
        return false;
      });
  }

  onPurchaseClick() {
    let user = this.authService.getLoggedInUser();
    if (user) {
      if (this.quantity) {
        this.paymentService.submitPayment(this.tour, this.authService.getLoggedInUser(), this.quantity);
        this.router.navigate(['/checkout']);
      }

    } else {
      this.router.navigate(['/login']);
    }

  }

}
