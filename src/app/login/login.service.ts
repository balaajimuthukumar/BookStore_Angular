import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserData } from "../shared/Model/user.model";
import { APIServicesService } from '../api-services.service';
import { tap,catchError ,throwError, BehaviorSubject} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface User{
  userName:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user = new BehaviorSubject(null);
  constructor(private http:HttpClient,private api:APIServicesService,private router:Router) { }

  Login(email, password){
    return this.http.post<any>(this.api.loginURL,
      {
        userName: email,
        password: password
      }).pipe(catchError(this.handlingError),tap(resData=>{
        console.log('1',resData);
        this.handlingAuthentication(resData.emailId,resData.id,resData.userName,resData.token,resData.expiredTime);
      })
      )
  }

  handlingError(errorRes:HttpErrorResponse){
    let errorMessage = 'An unknown occured!';
    if(!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    } else{
      errorMessage = 'Invalid Credential';
      return throwError(errorMessage);
    }
  }

  handlingAuthentication(email, id, userName, token, expiredTime){
    const users = new UserData(email,id,userName,token,expiredTime);
    localStorage.setItem('userData',JSON.stringify(users));
    this.user.next(users);
    this.router.navigate(['/Home']);
  }

  logout(){
    console.log("insidee logout");
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }

  autoLogin(){
    console.log('auto Login');
    
    const user: {
      email:string,
      id:string,
      userName:string,
      _token:string,
      _tokenExpireDate
    } = JSON.parse(localStorage.getItem('userData'));

    if(!user){
      this.router.navigate(['/auth']);
      return;
    }
    console.log(user);
    const loadeduser  = new UserData(user.email,user.id,user.userName,user._token,new Date(user._tokenExpireDate));
    if(loadeduser.token){
        this.user.next(loadeduser);
    }
  }

}
