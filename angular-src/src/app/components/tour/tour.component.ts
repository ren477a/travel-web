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

  tour: any;
  tourId: String;
  quantity: number;
  msg: String;
  itinerary: any;

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
      this.tour = res.tour
      this.itinerary = this.tour.itinerary[0].split("\n")
    },
      err => {
        console.log(err);
        return false;
      });
  }

  isUserLoggedIn():boolean {
    return this.authService.userLoggedIn()
  }

  onPurchaseClick() {
    let user = this.authService.getLoggedInUser();
    if (user) {
      if (this.quantity) {
        if(this.quantity > 0 && this.quantity <= 20){
          this.msg = "";
          this.paymentService.submitPayment(this.tour, this.authService.getLoggedInUser(), this.quantity);
          this.router.navigate(['/checkout']);
        } else{
          this.msg = "Invalid quantity.";
        }
      } else{
          this.msg = "Invalid quantity.";
      }

    } else {
      this.router.navigate(['/login']);
    }

  }

}
