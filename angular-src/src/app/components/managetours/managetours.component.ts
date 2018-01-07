import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToursService } from '../../services/tours.service';
import { Router } from '@angular/router';

declare var jquery:any;   // not required
declare var $ :any;   // not required

@Component({
  selector: 'app-managetours',
  templateUrl: './managetours.component.html',
  styleUrls: ['./managetours.component.css']
})
export class ManagetoursComponent implements OnInit {

  title: String;
  agency: String;
  description: String;
  duration: String;
  type: String;
  itinerary: String;
  inclusions: String;
  exclusions: String;
  terms: String;
  validityInDays: String;
  price: String;

  constructor(
    private authService: AuthService,
    private toursService: ToursService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  testMethod() {
    console.log(1);
    $("h1").css("color:#123456");
    this.router.navigate(['/manage']);
  }

  onClickAddTour() {
    //TODO validation
    let isInternational: Boolean = this.type === 'International';
    const tour = {
      title: this.title,
      agency: this.authService.getLoggedInAgency().agencyName,
      description: this.description,
      duration: +this.duration,
      isInternational: isInternational,
      itinerary: this.itinerary,
      inclusions: this.inclusions,
      exclusions: this.exclusions,
      terms: this.terms,
      validityInDays: +this.validityInDays,
      pricing: {
        ptype: "fixed",
        fixed: +this.price,
        group: []
      }
    }

    this.toursService.addTour(tour).subscribe(data => {
      if(data.success) {
        console.log("Submit success");
        $("#addTourModal").modal("hide");
        this.router.navigate['/manage'];
      } else {
        console.log("Something went wrong")
      }
    });
  }
}
