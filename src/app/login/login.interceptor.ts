import {  HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take, exhaustMap } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()

export class LoginInterceptor implements HttpInterceptor{
  constructor(private loginService:LoginService){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.loginService.user.pipe(
      take(1),
      exhaustMap( user=>{
        if(!user){
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth',user.token)
        });
        return next.handle(modifiedReq)
      })
    )
  }
}