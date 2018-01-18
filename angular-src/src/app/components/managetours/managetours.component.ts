import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToursService } from '../../services/tours.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

declare var jquery: any;   // not required
declare var $: any;   // not required

@Component({
  selector: 'app-managetours',
  templateUrl: './managetours.component.html',
  styleUrls: ['./managetours.component.css']
})
export class ManagetoursComponent implements OnInit {
  @ViewChild('btnAddTour') btnAddTour: ElementRef;
  @ViewChild('alertS') alertS: ElementRef;
  @ViewChild('alertD') alertD: ElementRef;

  showWithStatus: String;

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

  photo: File;

  tours: Array<any>;
  selectedTour: any;

  msg: String;

  activePage: number;
  pages: Array<Number>;

  sub: Subscription;

  constructor(
    private authService: AuthService,
    private toursService: ToursService,
    private validateService: ValidateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.showWithStatus = 'onsale';
    this.selectedTour = { pricing: { fixed: 0 } };
    this.reload(1);
  }

  reload(pageNum) {
    const query = { agency: this.authService.getLoggedInAgency().agencyName, status: this.showWithStatus };
    this.sub = this.toursService.findTours(query, pageNum).subscribe(res => {
      this.tours = res.tours;
      this.pages = Array(res.totalPages).fill(1).map((x, i) => i + 1);
      if (this.pages.length == 0) this.tours = [];
      this.activePage = res.pageNum;
      console.log(this.tours);
    });
  }

  onChangeTab(status) {
    this.showWithStatus = status;
    this.sub.unsubscribe();
    this.reload(1);

  }

  getFiles(event) {
    this.photo = event.target.files[0];
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
      price: +this.price,
      img: ''
    }
    console.log(tour)
    let valid = this.validateService.validateTour(tour);
    if (valid != "success") {
      this.msg = valid;
      return;
    }
    if (this.photo) {
      this.toursService.uploadPhoto(this.photo).subscribe(res => {
        console.log(res.msg);
        if (res.file) {
          tour.img = res.file;

          console.log(tour.img);
          this.toursService.addTour(tour).subscribe(data => {
            if (data.success) {
              console.log("Submit success");
              this.clearData();
              this.reload(1);
              setTimeout(() => {
                this.btnAddTour.nativeElement.click();
                this.router.navigate['/manage'];
              }, 1000);
              this.showSuccess('You added a new tour.');
            } else {
              this.msg = "Something went wrong."
            }
          });
        }
      });
    } else {
      this.msg = 'Please add a photo.'
    }
  }

  onItemClick(tour) {
    this.selectedTour = tour;
    console.log(this.selectedTour);
  }

  onClickStopSelling() {
    console.log("Stop selling")
    this.toursService.stopSelling(this.selectedTour._id).subscribe(data => {
      console.log(data);
      this.router.navigate(['/manage']);
      this.reload(this.activePage);
      setTimeout(() => {
        this.router.navigate(['/manage']);
      }, 300);
    });
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

  nextPage() {
    this.activePage++;
    if (this.activePage >= this.pages.length) this.activePage = this.pages.length;
    this.sub.unsubscribe();
    this.reload(this.activePage);
  }

  previousPage() {
    this.activePage--;
    if (this.activePage < 0) this.activePage = 0;
    this.sub.unsubscribe();
    this.reload(this.activePage);
  }

  toPage(page) {
    this.activePage = page;
    if (this.activePage < 0) this.activePage = 0;
    if (this.activePage >= this.pages.length) this.activePage = this.pages.length;
    this.sub.unsubscribe();
    this.reload(this.activePage);
  }

  showDanger(msg) {
    this.alertD.nativeElement.style.display = 'block';
    this.alertD.nativeElement.innerHTML = "<strong>Oh snap!</strong> " + msg;
    setTimeout(() => {
      this.alertD.nativeElement.style.display = 'none';
    }, 10000);
  }

  showSuccess(msg) {
    this.alertS.nativeElement.style.display = 'block';
    this.alertS.nativeElement.innerHTML = "<strong>Success!</strong> " + msg;
    setTimeout(() => {
      this.alertS.nativeElement.style.display = 'none';
    }, 10000);
  }
}
