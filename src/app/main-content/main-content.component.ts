import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { Book, Unit } from '../shared/book';
import { GetBook } from '../shared/Model/model';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../shared/book-service';
import { ActivatedRoute, Params } from '@angular/router';
import { FilterServiceService } from '../filter-service.service';
import { BookData } from '../shared/Model/book.model';

@Component({
  selector: 'app-main-content',
  styleUrls: ['./main-content.component.css'],
  templateUrl: './main-content.component.html'
})
export class MainContentComponent {
  BookDetails:BookData[];
  bookSubscription:Subscription;
  BookData:GetBook[];

  constructor(private filterService:FilterServiceService, private http: HttpClient, private bookService:BookService, private route:ActivatedRoute){
    this.BookDetails = <BookData[]>this.filterService.BookDetails;
    //this.BookData = this.bookService.books;
    this.BookData = [
      {
        title:"my book title",
        Rate:30,
        stock:10
      },      {
        title:"test book title",
        Rate:30,
        stock:10
      },      {
        title:"sample book title",
        Rate:30,
        stock:10
      }
    ]
  }

  ngOnInit(){
    console.log(this.BookData);
    console.log("inside the main component");
  }

  ngDoCheck(){
    this.BookDetails = this.filterService.getTableData();
  }

  ngOnChanges(){

  }
  // this.BookDetails = <Book[]>this.filterService.getTableData();
} 