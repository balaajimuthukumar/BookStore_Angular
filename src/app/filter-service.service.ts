import { Injectable } from '@angular/core';
import { Book, Unit } from './shared/book';
import { AutoCompleteCompleteEvent, AutoCompleteLazyLoadEvent } from 'primeng/autocomplete';
import { BehaviorSubject, Subject } from 'rxjs';
import { BookData } from './shared/Model/book.model';
import { BookService } from './shared/book-service';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {
  BookDetails:BookData[] = [];
  filteredData:BookData[] = [];
  updatedBooks:BehaviorSubject<Book[]>;
  // isChanged:BehaviorSubject<Boolean>;
  isChanged:Boolean;

  constructor(private bookServ:BookService) {
    this.BookDetails = this.bookServ.books;
    // this.BookDetails = [{
    //   author:"my author",
    //   publisher:"Test publisher",
    //   title:"my book title",
    //   sellingprice:30,
    //   url:"",
    //   unit:Unit.Dollar
    //  },{
    //   author:"test author",
    //   publisher:"My Test publisher",
    //   title:"test book title",
    //   sellingprice:25,
    //   url:"",
    //   unit:Unit.Dollar
    //  },{
    //   author:"author",
    //   publisher:"sample publisher",
    //   title:"sample book title",
    //   sellingprice:40,
    //   url:"",
    //   unit:Unit.Dollar
    //  }];

    //  this.updatedBooks = new BehaviorSubject(this.BookDetails);
    //  this.isChanged = new BehaviorSubject(false);
     this.isChanged = false;
   }

  getFilteredData(selectedItem:string){
    let filteredValues:string[] = [];
    console.log(selectedItem);
    if(selectedItem != undefined){
      this.filteredData = [];
      this.BookDetails.forEach(
        (value, index)=>{
          if(value.title.includes(selectedItem.trim())){
            filteredValues.push(value.title);
            this.filteredData.push(this.BookDetails[index]);
          }
        }
      );

      // this.updatedBooks = new BehaviorSubject(this.filteredData);

    }

    return filteredValues;
  }

  getTableData(){
    // this.isChanged.getValue()
    if(this.isChanged){
      return this.filteredData
    }
    // this.isChanged = new BehaviorSubject(false);
    this.isChanged = false;
    return this.BookDetails;
  }
}




// let filteredValues:string[] = [];
// console.log(selectedItem);
// if(selectedItem != undefined){
//   this.BookDetails.forEach(
//     (value, index)=>{
//       if(value.title.includes(selectedItem.trim())){
//         filteredValues.push(value.title);
//         this.filteredData.push(this.BookDetails[index]);
//       }
//     }
//   );

//   this.isChanged.next(false);
// }

// return filteredValues;

// console.log(this.isChanged.getValue())
// if(this.isChanged.getValue()){
//   return this.getFilteredData(selectedItem)
// }
// return this.BookDetails;

