import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { AuthService } from '../../services/auth.service';
import { ToursService } from '../../services/tours.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.css']
})
export class UseraccountComponent implements OnInit {

  userTransactions: Array<any>;
  pages: Array<Number>
  activePage: number;


  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private toursService: ToursService,
    private router: Router
  ) { 
    this.activePage = 1;
    this.pages = Array(5).fill(1).map((x,i)=>i);
  }

  ngOnInit() {
    this.fetchData();
  }

  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }

  getTourTitle(id) {
    let tour: any;
    this.toursService.findTourById(id).subscribe(res => {
      tour = res;
      return tour.title;
    });
  }

  toPage(page) {
    this.activePage = page
    this.fetchData()
  }

  previousPage() {    
    this.activePage--
    if(this.activePage<=0) this.activePage = 1;
    this.fetchData()
  }

  nextPage() {
    this.activePage++
    if(this.activePage>=this.pages.length) this.activePage = this.pages.length;
    this.fetchData()
  }

  fetchData() {
    let user = this.authService.getLoggedInUser();
    if(user) {
      this.transactionService.findTransactionsByCustomerId(user._id, this.activePage).subscribe(res => {
        console.log(res)
        this.userTransactions = res.transactions;
        this.pages = Array(res.totalPages).fill(1).map((x,i)=>i+1);
      });
    }
  }

  isActivePage(i) {
    return i+1 === this.activePage
  }

}
