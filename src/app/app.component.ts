import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { LeftMenuComponent } from './core/left-menu/left-menu.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'primeng-project';
  @ViewChild('navsidemenu') sideBarComponent:LeftMenuComponent;
  @ViewChild('menu') menuBtn:NavigationComponent;

  constructor(private router:Router, private auth:LoginService){}

  ngOnInit(){
    
    let currentRoute = this.router.routerState.root;
    console.log(this.router.config);
    currentRoute.children.forEach((value)=>{
      console.log(value);
    });
    console.log(this.auth.user);
    this.auth.autoLogin();
  }

  ngOnChanges(){
    console.log("test");
  }

  toggleSideBar(isToggle:boolean){
    this.sideBarComponent.toggleNav(isToggle);
  }
}
