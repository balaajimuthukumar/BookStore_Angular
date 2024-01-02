import { Component, EventEmitter, OnChanges, Output } from '@angular/core';
import { MenuItem, OverlayOnShowEvent } from 'primeng/api';
import { AutoCompleteCompleteEvent, AutoCompleteLazyLoadEvent } from 'primeng/autocomplete';
import { FilterServiceService } from '../../filter-service.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  items:MenuItem[];
  suggestionList:string[] = ['suggestion 1', 'suggestiion 2', 'option 1'];
  suggestions:string[] = [];
  selectedItem:any;

  @Output() sidebarVisible = new EventEmitter<boolean>();

  constructor(private filterService:FilterServiceService){

  }

  ngOnInit(){
    
  }

  OnChanges(){
    console.log("test");
  }

  search(selectedItem:string){
    // this.filterService.isChanged = new BehaviorSubject(true);
    this.filterService.isChanged = true;
    this.suggestions = <string[]>this.filterService.getFilteredData(selectedItem);  
  }

  toggleSideBar(isToggle:boolean){
    console.log("navbar");
    this.sidebarVisible.emit(isToggle);
  }
  // filterTable(selectedItem:AutoCompleteCompleteEvent){
  // }

  // rePopulateTable(loseFocus:Event){
  //   // console.log(loseFocus);
  // }
}



    // this.items = [{
    //   label:"Menu",
    //   icon:"pi pi-fw pi-menu",
    //   items:[{
    //     label:"Option 1",
    //     icon:"pi pi-fw pi-option1"
    //   },{
    //     label:"Option 2",
    //     icon:"pi pi-fw pi-option2"
    //   }]
    // }];





    // console.log(selectedItem.query)
    // this.suggestions = <string[]>this.filterService.getFilteredData(selectedItem.query);  
    // this.filterService.isChanged.next(true);