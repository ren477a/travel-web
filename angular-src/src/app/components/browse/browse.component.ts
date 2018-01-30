import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  tours: Array<any>;
  keyword: String;
  minPrice: Number;
  maxPrice: Number;
  sortBy: String;
  msg: String;
  activePage: number;
  pages: Array<Number>;

  sub: Subscription;

  constructor(
    private toursService: ToursService,
    private router: Router,
    private validateService: ValidateService
  ) {
  }

  ngOnInit() {
    if(!this.keyword) this.keyword = '';
    this.sub = this.toursService.findTours({key: this.keyword, status: 'onsale'}, 1).subscribe(res => {
      this.tours = res.tours;
      this.pages = Array(res.totalPages).fill(1).map((x,i)=>i+1);
      this.activePage = 1;
    });
  }

  onSearch() {
    this.sub.unsubscribe();
    let searchParams = {
      key: this.keyword.toLowerCase(),
      min: this.minPrice,
      max: this.maxPrice,
      sortBy: this.sortBy, //date //price //alphabetical
      status: 'onsale'
    }
    let validationResult = this.validateService.validationSearch(searchParams);
    if(validationResult==="success"){
        this.msg="";
        this.sub = this.toursService.findTours(searchParams ,1).subscribe(res => {
        this.tours = res.tours;
        // this.pages = new Array(res.totalPages+1);
        // for(let i = 1; i <= this.pages.length; i++) {
        //   this.pages[i] = i;
        // }
        this.pages = Array(res.totalPages).fill(1).map((x,i)=>i+1);
        this.activePage = 1
      });
      console.log(this.pages);
      console.log("search");
      console.log(this.keyword);
      console.log(this.minPrice);
      console.log(this.maxPrice);
      console.log(this.sortBy);
    }
    else{
      this.msg = validationResult;
    }

   
  }

  nextPage() {
    this.activePage++;
    if(this.activePage>=this.pages.length) this.activePage = this.pages.length;
    this.sub.unsubscribe();
    this.fetchData()
  }

  previousPage() {
    this.activePage--;
    if(this.activePage<0) this.activePage = 0;
    this.sub.unsubscribe();
    this.fetchData()
  }

  toPage(page) {
    this.activePage = page;
    if(this.activePage<0) this.activePage = 0;
    if(this.activePage>=this.pages.length) this.activePage = this.pages.length;
    this.sub.unsubscribe();
    this.fetchData();
  }

  fetchData() {
    this.sub = this.toursService.findTours({
      key: this.keyword.toLowerCase(),
      min: this.minPrice,
      max: this.maxPrice,
      sortBy: this.sortBy, //date //price //alphabetical
      status: 'onsale'
    }, this.activePage).subscribe(res => {
      this.tours = res.tours;
      console.log(res.tours);
      this.pages = Array(res.totalPages).fill(1).map((x,i)=>i+1);
    });
  }

  isActivePage(i) {
    return i === this.activePage
  }
}
