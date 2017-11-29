import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tours: Array<any>;

  constructor(private toursService: ToursService) {
   }

  ngOnInit() {
    this.toursService.findTours().subscribe(res => {
      this.tours = res;
      console.log(this.tours[0].title);
    });
  }

}
