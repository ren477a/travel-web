import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.firstname == undefined ||
      user.lastname == undefined ||
      user.mobileNumber == undefined ||
      user.email == undefined ||
      user.password == undefined) {
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validation(user) {
    //validation firstname
    var isLetter = "[a-zA-Z]";
    var firstname = user.firstname;
    var y = true;
    if (firstname.length <= 30) {
      for (let x = 0; x < firstname.length; x++) {
        if (!(firstname.charAt(x).match(isLetter))) {

          y = false;
        }
      }
    }
    else {
      y = false;
    }

    if (!y) {
      return "Firstname must be Letters only and maximum of 30 letters only";
    }
    //validation lastname
    var lastname = user.lastname;
    var y = true;
    if (lastname.length <= 30) {
      for (let x = 0; x < lastname.length; x++) {
        if (!(lastname.charAt(x).match(isLetter))) {
          y = false;
        }
      }
    }
    else {
      y = false;
    }

    if (!y) {
      return "Lastname must be Letters only and maximum of 30 letters only";
    }
    
    //validation email
    var email = user.email;
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      return "Invalid Email";
    }
    //validation mobile number
    let mobile = user.mobileNumber.substr(user.mobileNumber.indexOf("9"), user.mobileNumber.length);
    let mobs = true;
    if (mobile.length == 10) {
      for (let x = 0; x < mobile.length; x++) {
        if (!(mobile.charAt(x).match(number))) {
          mobs = false;
        }
      }
    }
    else {
      mobs = false;
    }
    if (!mobs) {
      return "Invalid mobile number";
    }

    // validation password
    var isLetter = "[a-zA-Z]";
    var isCapitalLetter = false;
    var isLowerLetter = false;
    var isNumber = false;
    var isSpecialCharacter = false;
    var number = "^[0-9]";
    var password = user.password;
    var pass = false;

    if (password.length >= 8 && password.length <= 20) {
      pass = true;
      for (let x = 0; x < password.length; x++) {
        if (password.charAt(x).match(isLetter)) {
          if (password.charAt(x) == password.charAt(x).toUpperCase()) {
            isCapitalLetter = true;
          }
          if (password.charAt(x) == password.charAt(x).toLowerCase()) {
            isLowerLetter = true;
          }

        }
        else if (password.charAt(x).match(number)) {
          isNumber = true;
        }
        else {
          isSpecialCharacter = true;
        }
      }
    }
    if (!(isCapitalLetter && isLowerLetter && isNumber && !isSpecialCharacter && pass)) {
      return "Password must contain 8 to 20 characters with at least one lowercase, one uppercase and one numeric character.";
    }
    return "success";
  }
}
