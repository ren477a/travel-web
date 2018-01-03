import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.css']
})
export class UseraccountComponent implements OnInit {

  userTransactions: Array<any>;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    let user = this.authService.getLoggedInUser();
    if(user) {
      this.transactionService.findTransactionsByCustomerId(user.id).subscribe(res => {
        this.userTransactions = res;
      });
    }
  }

}
