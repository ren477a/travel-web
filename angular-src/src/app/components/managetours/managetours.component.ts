import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('btnAddTour') btnAddTour: ElementRef;

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

  tours: Array<any>;
  selectedTour: any;

  constructor(
    private authService: AuthService,
    private toursService: ToursService,
    private router: Router
  ) { }

  ngOnInit() {
    this.selectedTour = {pricing: {fixed: 0 }};
    const query = {  agency: this.authService.getLoggedInAgency().agencyName };
    this.toursService.findTours(query).subscribe(res => {
      this.tours = res;
      console.log(this.tours);
    });
  }

  onClickAddTour() {
    //TODO validation
    const tour = {
      title: this.title,
      agency: this.authService.getLoggedInAgency().agencyName,
      description: this.description,
      duration: +this.duration,
      type: this.type,
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
        this.clearData();
        this.btnAddTour.nativeElement.click();
        this.router.navigate['/manage'];
      } else {
        console.log("Something went wrong")
      }
    });
  }

  onItemClick(tour) {
    this.selectedTour = tour;
  }

  clearData() {
    this.title = "";
    this.agency = "";
    this.description = "";
    this.duration = "";
    this.type = "";
    this.itinerary = "";
    this.inclusions = "";
    this.exclusions = "";
    this.terms = "";
    this.validityInDays = "";
    this.price = "";
  }
}
