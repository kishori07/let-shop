import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopServiceService } from '../services/shop-service.service';

@Injectable({
  providedIn: 'root'
})
export class DoubleauthGuard implements CanActivate {
  constructor(private _shopService : ShopServiceService, private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const islogged = this._shopService.isLoggedIn;
    if (islogged) {
      
      return false;
    }
    return true;
  }
  
}
