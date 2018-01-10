import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  tours: Array<any>;
  urls: Array<String>;
  keyword: String;
  minPrice: Number;
  maxPrice: Number;
  sortBy: String;

  activePage: number;
  pages: Array<Number>;

  sub: Subscription;

  constructor(
    private toursService: ToursService,
    private router: Router
  ) {
    this.pages = Array(5).fill(1).map((x,i)=>i);
  }

  ngOnInit() {
    if(!this.keyword) this.keyword = '';
    // let regex = new RegExp('.*'+this.keyword+'.*', "i")
    // let query = {
    //   title: { $regex: regex, $options: 'i'},
    //   agency: { $regex: regex, $options: 'i'},
    //   description: { $regex: regex, $options: 'i'},
    //   itinerary: { $regex: regex, $options: 'i'}
    // }
    this.sub = this.toursService.findTours({title: this.keyword}, 1).subscribe(res => {
      this.tours = res.tours;
      this.urls = res.urls;
      // this.pages = new Array(res.totalPages+1);
      // for(let i = 1; i <= this.pages.length; i++) {
      //   this.pages[i] = i;
      // }
      this.pages = Array(res.totalPages).fill(1).map((x,i)=>i+1);
      this.activePage = res.pageNum;
    });
  }

  onSearch() {
    this.sub.unsubscribe();

    this.sub = this.toursService.findTours({
      title: this.keyword.toLowerCase()
    }, 1).subscribe(res => {
      this.tours = res.tours;
      // this.pages = new Array(res.totalPages+1);
      // for(let i = 1; i <= this.pages.length; i++) {
      //   this.pages[i] = i;
      // }
      this.urls = res.urls;
      this.pages = Array(res.totalPages).fill(1).map((x,i)=>i+1);
      this.activePage = res.pageNum
    });
    console.log(this.pages);
    console.log("search");
    console.log(this.keyword);
    console.log(this.minPrice);
    console.log(this.maxPrice);
  }

  nextPage() {
    this.activePage++;
    if(this.activePage>=this.pages.length) this.activePage = this.pages.length;
    this.sub.unsubscribe();
    this.sub = this.toursService.findTours({title: this.keyword}, this.activePage).subscribe(res => {
      this.tours = res.tours;
      console.log(res.tours);
      this.urls = res.urls;
      this.pages = Array(res.totalPages).fill(1).map((x,i)=>i+1);
      this.activePage = res.pageNum
    });
  }

  previousPage() {
    this.activePage--;
    if(this.activePage<0) this.activePage = 0;
    this.sub.unsubscribe();
    this.sub = this.toursService.findTours({title: this.keyword}, this.activePage).subscribe(res => {
      this.tours = res.tours;
      console.log(res.tours);
      this.urls = res.urls;
      this.pages = Array(res.totalPages).fill(1).map((x,i)=>i+1);
      this.activePage = res.pageNum
    });
  }

  toPage(page) {
    this.activePage = page;
    if(this.activePage<0) this.activePage = 0;
    if(this.activePage>=this.pages.length) this.activePage = this.pages.length;
    this.sub.unsubscribe();
    this.sub = this.toursService.findTours({title: this.keyword}, this.activePage).subscribe(res => {
      this.tours = res.tours;
      console.log(res.tours);
      this.urls = res.urls;
      this.pages = Array(res.totalPages).fill(1).map((x,i)=>i+1);
      this.activePage = res.pageNum
    });
  }
}
