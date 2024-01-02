import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent {
  panelItems:MenuItem[];
  @Input() toggleNavigation:boolean = false;
  togNav = new BehaviorSubject<boolean>(false);

  constructor(private router: Router){}

  ngOnInit(){
    this.panelItems = [
      {
        label:"sidemenu 1",
        icon:"pi pi-pw pi-sidemenu",
        items:[{
          label:"Option 1",
          icon:"pi pi-fw pi-option1"
        },{
          label:"Option 2",
          icon:"pi pi-fw pi-option2"
        }]
      }, {
        label:"sidemenu 2",
        icon:"pi pi-pw pi-sidemenu2",
        items:[{
          label:"Option 1",
          icon:"pi pi-fw pi-option3"
        },{
          label:"Option 2",
          icon:"pi pi-fw pi-option4"
        }]
      }, {
        label:"sidemenu 3",
        icon:"pi pi-pw pi-sidemenu3",
        items:[{
          label:"Option 1",
          icon:"pi pi-fw pi-option5"
        },{
          label:"Option 2",
          icon:"pi pi-fw pi-option6"
        }]
      }
    ]
  }

  toggleNav(isToggle:boolean){
    this.toggleNavigation = isToggle;
    this.togNav.next(this.toggleNavigation);
  }

  navigate(page:string){
    console.log(page)
    this.router.navigate([`/${page}`]);
  }
}
