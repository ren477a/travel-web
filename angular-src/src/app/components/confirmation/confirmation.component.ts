import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  canProceed: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.canProceed = false;
    setTimeout(() => {
      this.canProceed = true;
    }, 3000);
  }

  onClickHere() {
    this.router.navigate(['/useraccount']);
  }

}
