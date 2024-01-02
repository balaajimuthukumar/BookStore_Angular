import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { SalesServiceService } from './sales-service.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  items:MenuItem[];
  salesFormData:FormGroup;
  activeIndex:Number;

  constructor(private saleService:SalesServiceService){
    this.items = [
      {
        label:"Contact",
        icon:"pi pi-pw pi-sidemenu",
        routerLink:"/Sales/contact"
      }, {
        label:"Billing",
        icon:"pi pi-pw pi-sidemenu2",
        routerLink:"/Sales/billing"
      }, {
        label:"Invoice",
        icon:"pi pi-pw pi-sidemenu3",
        routerLink:"/Sales/confirmation"
      }
    ]
    
    this.salesFormData = new FormGroup({});
  }

  ngOnChange(){
    
  }

  onActiveIndexChange(index:number){
    this.activeIndex = index;
  }
}
