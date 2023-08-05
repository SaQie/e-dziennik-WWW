import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {


  constructor(private authService: AuthorizationService, private router: Router, private jwtService: JwtHelperService) {

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.getToken() !== null) {
      const expectedRole = route.data['expectedRole'];
      console.log(expectedRole);
      const token = sessionStorage.getItem('token');
      if (token === null) {
        this.router.navigate(['']);
        return false;
      }
      const decodedToken = this.jwtService.decodeToken(token);
      const role = decodedToken.roles[0];
      if (expectedRole === role) {
        return true;
      }
      if (expectedRole === undefined){
        return true;
      }
    }

    this.router.navigate(['']);
    return false;
  }



}
