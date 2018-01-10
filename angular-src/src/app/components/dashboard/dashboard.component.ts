import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  agency: any;
  transactions: Array<any>;
  selected: any;

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.agency = this.authService.getLoggedInAgency();
    console.log(this.agency)
    this.transactionService.findTransactionsByAgencyName(this.agency.agencyName).subscribe(res => {
        this.transactions = res;
        this.selected = this.transactions[0];
      })
  }

  reload() {
    this.transactionService.findTransactionsByAgencyName(this.agency.agencyName).subscribe(res => {
      this.transactions = res;
      this.selected = this.transactions[0];
    })
  }

  detailsClick(tr) {
    this.selected=tr;
  }

  markClick(id) {
    console.log(id);
    this.transactionService.claim(id).subscribe(res => {
      console.log(res);
      this.reload();
    });
  }

}
