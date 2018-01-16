import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { ToursService } from '../../services/tours.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tours: Array<any>;
  private subscription: ISubscription;

  constructor(
    private toursService: ToursService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.subscription = this.toursService.findFeatured().subscribe(res => {
      this.tours = res.tours;
    });
  }
  
  onStartBrowsing() {
    this.router.navigate(['/browse']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
