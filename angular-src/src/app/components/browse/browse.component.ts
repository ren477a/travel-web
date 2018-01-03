import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

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

    onSearch() {
      console.log("search");
    }

}
