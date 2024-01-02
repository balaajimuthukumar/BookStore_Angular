import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

import { LoginService } from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class BookStoreResolverService implements CanActivate {

  constructor(private loginService:LoginService, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.loginService.user.value);
  
    if(this.loginService.user.value != null){
        return true;
    }
      this.router.navigate(['/auth']);
  }
}