import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginagency',
  templateUrl: './loginagency.component.html',
  styleUrls: ['./loginagency.component.css']
})
export class LoginagencyComponent implements OnInit {
  email: String;
	password: String;
	msg: String;
  constructor(
  	private authService: AuthService,
  	private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
  	const agency = {
  		email: this.email,
  		password: this.password
  	}

  	this.authService.authenticateAgency(agency).subscribe(data => {
  		if(data.success) {
			  this.authService.storeUserData(data.token, data.agency);
			  this.authService.userType = "agency";
  			console.log(data.msg);
  			this.router.navigate(['/dashboard']);
  		} else {
  			this.msg = data.msg;
  			this.router.navigate(['login/agency']);
  		}
  	});


  }

}
