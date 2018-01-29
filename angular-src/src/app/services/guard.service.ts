import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  CanLoad,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service'
import { ActivatedRoute } from '@angular/router/src/router_state';

@Injectable()
export class GuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole
    let role
    if(this.auth.getUserType().user !== undefined) {
      role = 'user'
    } else if (this.auth.getUserType().agency != undefined) {
      role = 'agency'
    }
    console.log(role)
    if(!this.auth.loggedIn() || role !== expectedRole) {
      this.router.navigate['/404']
      return false
    } 
    return true
  }
}
