import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router, private auheService: AuthService){}

  canActivate( route: ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    const currentUser = this.auheService.currentUserValue;
    if(currentUser){
      return true
    }

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;

  }

}
