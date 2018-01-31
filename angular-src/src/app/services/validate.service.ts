import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.firstname == undefined ||
      user.lastname == undefined ||
      user.mobileNumber == undefined ||
      user.email == undefined ||
      user.password == undefined ||
      user.firstname == '' ||
      user.lastname == '' ||
      user.mobileNumber == '' ||
      user.email == '' ||
      user.password == '') {
    } else {
      return true;
    }
  }

  validationSearch(searchParams) {

    //validation account name
    var y = true;
    var min = parseInt(searchParams.min);
    var max = parseInt(searchParams.max);
    if (min < 0 || max < 0) {
      y = false;
    }
    else if (max < min) {
      y = false;
    }


    if (!y) {

      return "Invalid Minimum or Maximum";
    }
    return "success";
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validation(user) {
    //validation firstname
    var isLetter = /^[a-zA-Z\s]*$/;
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
    var z = true;
    if (lastname.length <= 30) {
      for (let x = 0; x < lastname.length; x++) {
        if (!(lastname.charAt(x).match(isLetter))) {
          z = false;
        }
      }
    }
    else {
      z = false;
    }

    if (!z) {
      return "Lastname must be Letters only and maximum of 30 letters only";
    }

    //validation email
    var email = user.email;
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      return "Invalid Email";
    }
    var number = "^[0-9]";
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
    var isLetter1 = "[a-zA-Z]";
    var isCapitalLetter = false;
    var isLowerLetter = false;
    var isNumber = false;
    var isSpecialCharacter = false;

    var password = user.password;
    var pass = false;

    if (password.length >= 8 && password.length <= 20) {
      pass = true;
      for (let x = 0; x < password.length; x++) {
        if (password.charAt(x).match(isLetter1)) {
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



  validateTour(tours) {

    if (tours.title == undefined ||
      tours.price == undefined ||
      tours.duration == undefined ||
      tours.validityInDays == undefined ||
      tours.type == undefined ||
      tours.itinerary == undefined ||
      tours.description == undefined ||
      tours.inclusions == undefined ||
      tours.exclusions == undefined ||
      tours.terms == undefined ||
      tours.title == '' ||
      tours.price == '' ||
      tours.duration == '' ||
      tours.validityInDays == '' ||
      tours.type == '' ||
      tours.itinerary == '' ||
      tours.description == '' ||
      tours.inclusions == '' ||
      tours.exclusions == '' ||
      tours.terms == '') {
      return "Please fill in all the fields."
    }


    //validation title
    var isLetter = /^[a-zA-Z\s]*$/;
    var title = tours.title;
    if (!(title.length <= 50)) {
      return "Title: Maximum of 50 characters only.";
    }




    //validation price
    var price = tours.price;
    var number = "^[0-9]";
    if (isNaN(price)) {
      return "Price: Invalid price."
    }

    if (price > 100000 || price < 1) {

      return "Price: Value must be between 1 and 100000."
    }



    // validation Length in Days
    var l = tours.duration;
    if (isNaN(l)) {
      return "Trip Length: Invalid trip length.";
    }
    if (l > 30 || l < 1) {
      return "Trip Length: Value must be between 1 and 30."
    }

    var vd = tours.validityInDays;
    if (isNaN(vd)) {
      return "Voucher Lifespan: Invalid voucher lifespan.";
    }
    if (vd > 365 || vd < 7) {
      return "Voucher Lifespan: Value must be between 7 and 30."
    }




    //validation description
    var description = tours.description;
    if (!(description.length <= 600)) {
      return "Description: Maximum of 600 characters only.";
    }

    // validation Itenerary
    var itenerary = tours.itinerary;
    if (!(itenerary.length <= 600)) {
      return "Itinerary: Maximum of 600 characters only.";
    }
    // validation inclusions
    var inclusions = tours.inclusions;
    if (!(inclusions.length <= 600)) {
      return "Inclusions: Maximum of 600 characters only.";
    }
    //validation exclusion
    var exclusions = tours.exclusions;
    if (!(exclusions.length <= 600)) {
      return "Exclusions: Maximum of 600 characters only.";
    }
    //validation terms
    var terms = tours.terms;
    if (!(terms.length <= 600)) {
      return "Terms: Maximum of 600 characters only.";
    }

    return "success"
  }
  validateRegisterAgency(agency) {

    //validation agencyName
    var isLetter1 = /^[a-zA-Z\s]*$/;
    var agencyName = agency.agencyName;
    var y = true;
    if (agencyName.length <= 50 && agencyName.length != 0) {
      for (let x = 0; x < agencyName.length; x++) {
        if (!(agencyName.charAt(x).match(isLetter1))) {

          y = false;
        }
      }
    }
    else {
      y = false;
    }

    if (!y) {
      return "Agency name  must be Letters only and maximum of 50 letters only";
    }



    //validation Owner
    var ownedBy = agency.ownedBy;
    var z = true;
    if (ownedBy.length <= 30 && ownedBy.length != 0) {
      for (let x = 0; x < ownedBy.length; x++) {
        if (!(ownedBy.charAt(x).match(isLetter1))) {
          z = false;
        }
      }
    }
    else {
      z = false;
    }

    if (!z) {
      return "Owner name must be Letters only and maximum of 30 letters only";
    }

    var number = "^[0-9]";
    //validation mobile number
    var mobile = agency.mobileNumber.substr(agency.mobileNumber.indexOf("9"), agency.mobileNumber.length);
    var mobs = true;
    if (mobile.length == 10 && mobile.length != 0) {
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
      return "wrong input of Mobile Number";
    }

    //validation email
    var email = agency.email;
    if (!(email.length != 0)) {
      return "Invalid Email";
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      return "Invalid Email";
    }


    // validation password
    var isLetter = "[a-zA-Z]";
    var isCapitalLetter = false;
    var isLowerLetter = false;
    var isNumber = false;
    var isSpecialCharacter = false;
    var password = agency.password;
    var pass = false;

    if ((password.length >= 8 && password.length <= 20) && password.length != 0) {
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
      return "Password must contain 8 to 20 characters with: \nAtleast 1 Capital Letter \nAtleast 1 Number \nLetters";
    }

    return "success";
  }

  validateCashout(cashout) {

    //validation account name
    var number = "^[0-9]";
    var isLetter = /^[a-zA-Z\s]*$/;
    var bankName = cashout.bankAccount.bankName;
    var accountName = cashout.bankAccount.accountName;
    var accountNumber = cashout.bankAccount.accountNumber;
    var y = true;
    if (accountName.length != 0) {
      for (let x = 0; x < accountName.length; x++) {
        if (!(accountName.charAt(x).match(isLetter))) {
          y = false;
        }
      }
    }
    else {
      y = false;
    }

    if (!y) {
      return "Invalid account name";
    }

    //validation account number 
    var accs = true;
    if (accountNumber.length != 0) {
      for (let x = 0; x < accountNumber.length; x++) {
        if (!(accountNumber.charAt(x).match(number))) {
          accs = false;

        }
      }
    }
    else {
      accs = false;
    }

    if (!accs) {
      return "Invalid account number";
    }
    else {
      if (!(accountNumber.length >= 10 && accountNumber.length <= 16)) {
        console.log("nani");
        return "Invalid account number"
      }

    }
    return "success";

  }
}
