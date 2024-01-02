import { Component } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { UserData } from 'src/app/shared/Model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  header:string = "";
  label:string;
  constructor(private authService:LoginService){

  }

  ngOnInit(){
    let localStrg:UserData = JSON.parse(localStorage.getItem("userData"));
    
    if(localStrg != undefined || localStrg != null){
      console.log(this.header);
      this.header = localStrg.userName.toUpperCase();
      this.label = "Logout"
    }
  }

  logout(){
    console.log("inside logout");
    this.authService.logout();
  }
}