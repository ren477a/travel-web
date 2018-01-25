import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { ToursService } from '../../services/tours.service';
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
  dti: File;
  business: File;
  bir: File;

  msg: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private toursService: ToursService,
    private router: Router
  ) { this.msg = ''; }

  ngOnInit() {
  }

  getDtiFiles(event) {
    this.dti = event.target.files[0];
  }
  getBusinessFiles(event) {
    this.business = event.target.files[0];
  }
  getBirFiles(event) {
    this.bir = event.target.files[0];
  }

  onRegisterClick() {

    console.log("register agency")
    let dtiStr: string;
    let businessStr: string;
    let birStr: string;
    if(!this.dti || !this.bir || !this.bir) {
      this.msg = 'Please upload required documents.'
      return
    } 
    let agency = {
      agencyName: this.agencyName,
      ownedBy: this.ownedBy,
      mobileNumber: this.mobileNumber,
      email: this.email,
      password: this.password,
      address: this.address,
      dti: '',
      business: '',
      bir: ''
    }

     if (!this.validateService.validateRegisterAgency(agency)) {
      this.msg = "Please fill in all the fields.";
      return false;
    }

    let resultAgency = this.validateService.validateRegisterAgency(agency);

    console.log(resultAgency);
    if(resultAgency==="success"){
      this.msg = "";
      this.msg = 'Uploading dti file...';
      this.toursService.uploadPhoto(this.dti).subscribe(res => {
        if (res.file) {

          this.msg = 'Uploading business file...';
          dtiStr = res.file;

          this.toursService.uploadPhoto(this.business).subscribe(res => {
            if (res.file) {
              this.msg = 'Uploading bir file...';
              businessStr = res.file;
              this.toursService.uploadPhoto(this.bir).subscribe(res => {
                if (res.file) {
                  this.msg = 'All files uploaded. Please wait...';
                  birStr = res.file;
                  console.log("register btn pressed");
                  agency.dti = dtiStr
                  agency.business = businessStr
                  agency.bir = birStr

                  //Validate Here
                  this.authService.registerAgency(agency).subscribe(data => {
                    if (data.agency) {
                      console.log("Agency registered");
                      this.router.navigate(['/login/agency']);
                    } else {
                      console.log("Something went wrong");
                      this.router.navigate(['/register/agency']);
                    }
                  });
                }
              })
            }
          })
        }
      })
    } else{
      this.msg = resultAgency;
    }

  }

}
