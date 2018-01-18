import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TransactionService {

  isDev: boolean;

  constructor(private http: Http) {
    this.isDev = false; //false when deployed
  }

  findTransactionsByCustomerId(customerId) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/transactions/customer/' + customerId);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  findTransactionsByAgencyName(agencyName) {
    agencyName = encodeURIComponent(agencyName.trim())
    console.log(agencyName);
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/transactions/agency/' + agencyName);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  claim(id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/transactions/claim/' + id);
    return this.http.put(ep, {headers: headers})
      .map(res => res.json());
  }

  addCashout(cashout) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/cashout');
    return this.http.post(ep, cashout, {headers: headers})
      .map(res => res.json());
  }

  prepEndpoint(ep) {
    if (!this.isDev)
      return ep;
    else
      return 'http://localhost:8080/' + ep;
  }
}
