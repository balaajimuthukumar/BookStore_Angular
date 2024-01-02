import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent {
  items:MenuItem[];

  constructor(){
    this.items = [
      {
        label:"Contact",
        icon:"pi pi-pw pi-sidemenu",
        routerLink:"/Purchase/contact"
      }, {
        label:"Billing",
        icon:"pi pi-pw pi-sidemenu2",
        routerLink:"/Purchase/Details"
      }
    ]
  }

}
