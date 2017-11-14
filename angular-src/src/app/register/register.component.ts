import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstname: String;
  lastname: String;
  mobileNumber: String;
  email: String;
  password: String;


  constructor(
    private validateService: ValidateService, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      mobileNumber: this.mobileNumber,
      email: this.email,
      password: this.password
    }

  	if(!this.validateService.validateRegister(user)) {
      console.log("Please fill in all the fields.");
      return false;
    }

    if(!this.validateService.validateEmail(user.email)) {
      console.log("Please use a valid email.");
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        console.log("User registered");
        this.router.navigate(['/login']);
      } else {
        console.log("Something went wrong");
        this.router.navigate(['/register']);
      }
    });
    
  }

}
