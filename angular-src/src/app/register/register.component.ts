import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit() {
  }

  onRegisterSubmit() {
  	console.log("Submit button pressed");
  }

}
