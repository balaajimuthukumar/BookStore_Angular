import { Component } from '@angular/core';
import { APIServicesService } from '../api-services.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email="admin";
  password="Password1";
  constructor(private api:APIServicesService, private loginservice:LoginService){}

  login(){
    this.loginservice.Login(this.email,this.password).subscribe(data=>{
     console.log(this.loginservice.user);
     
    });
  }
}
