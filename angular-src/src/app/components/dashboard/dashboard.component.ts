import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';
import { Subscription } from 'rxjs/Subscription';
import { ValidateService } from '../../services/validate.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('btnCashout') btnCashout: ElementRef;
  @ViewChild('alertS') alertS: ElementRef;
  @ViewChild('alertD') alertD: ElementRef;

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
    private validateService: ValidateService,
    private authService: AuthService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.agency = this.authService.getLoggedInAgency();
    console.log(this.agency)
    this.sub = this.authService.findAgencyById(this.agency._id).subscribe(res => {
      this.agency = res.agency;
    })
    
    this.sub2 = this.transactionService.findTransactionsByAgencyName(this.agency.agencyName).subscribe(res => {
        this.transactions = res.transactions;
        this.selected = this.transactions[0];
      })
  }

  reload() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub = this.authService.findAgencyById(this.agency._id).subscribe(res => {
      this.agency = res.agency;
    })
    this.sub2 = this.transactionService.findTransactionsByAgencyName(this.agency.agencyName).subscribe(res => {
      this.transactions = res.transactions;
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

  canCashout() {
    if(this.agency.balance < 3000) {
      return false
    }
    return true
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

     if (!this.validateService.validateCashout(cashout)) {
      this.msg = "Please fill in all the fields.";
      return false;
    }
    let resultCashout = this.validateService.validateCashout(cashout);
    if(resultCashout==="success"){
        this.msg = "";
        this.msg = 'Submitting...'
        console.log(cashout)
        this.transactionService.addCashout(cashout).subscribe(res => {
          console.log(res);
          this.showSuccess('Cashout request submitted.')
          this.btnCashout.nativeElement.click();
          this.reload();
        })
    } else{
      this.msg = resultCashout;
    }
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
