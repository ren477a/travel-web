import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('btnCashout') btnCashout: ElementRef;

  agency: any;
  transactions: Array<any>;
  selected: any;

  bankName: String;
  accountNumber: String;
  accountName: String;

  msg: String;

  sub: Subscription;
  sub2: Subscription;

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.agency = this.authService.getLoggedInAgency();
    console.log(this.agency)
    this.sub = this.authService.findAgencyById(this.agency._id).subscribe(res => {
      this.agency = res;
    })
    this.sub2 = this.transactionService.findTransactionsByAgencyName(this.agency.agencyName).subscribe(res => {
        this.transactions = res;
        this.selected = this.transactions[0];
      })
  }

  reload() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub = this.authService.findAgencyById(this.agency._id).subscribe(res => {
      this.agency = res;
    })
    this.sub2 = this.transactionService.findTransactionsByAgencyName(this.agency.agencyName).subscribe(res => {
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

  submitCashout() {
    let cashout = {
      agencyId: this.agency._id,
      agency: this.agency.agencyName,
      bankAccount: {
        accountNumber: this.accountNumber,
        accountName: this.accountName,
        bankName: this.bankName
      },
      status: 'pending',
      amount: this.agency.balance
    }
    this.msg = 'Submitting...'
    console.log(cashout)
    this.transactionService.addCashout(cashout).subscribe(res => {
      console.log(res);
      this.btnCashout.nativeElement.click();
      this.reload();
    })
  }

}
