import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registeragency',
  templateUrl: './registeragency.component.html',
  styleUrls: ['./registeragency.component.css']
})
export class RegisteragencyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onRegisterClick() {
    console.log("register btn pressed");
  }

}
