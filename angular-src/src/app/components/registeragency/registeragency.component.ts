import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeragency',
  templateUrl: './registeragency.component.html',
  styleUrls: ['./registeragency.component.css']
})
export class RegisteragencyComponent implements OnInit {

  agencyName: String;
  ownedBy: String;
  mobileNumber: String;
  email: String;
  password: String;
  address: String;
  dti: String;
  business: String;
  bir: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterClick() {
    console.log("register btn pressed");
    const agency = {
      agencyName: this.agencyName, 
      ownedBy: this.ownedBy, 
      mobileNumber: this.mobileNumber, 
      email: this.email, 
      password: this.password, 
      address: this.address, 
      dti: this.dti, 
      business: this.business, 
      bir: this.bir
    }

    //Validate Here

    this.authService.registerAgency(agency).subscribe(data => {
      if (data.success) {
        console.log("Agency registered");
        this.router.navigate(['/login/agency']);
      } else {
        console.log("Something went wrong");
        this.router.navigate(['/register/agency']);
      }
    });
    
  }

}
