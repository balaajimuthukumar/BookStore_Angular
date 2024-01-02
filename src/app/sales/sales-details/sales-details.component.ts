import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookData } from '../../shared/Model/book.model';
import { LoginService } from 'src/app/login/login.service';
import { SalesServiceService } from '../sales-service.service';
import { APIServicesService } from 'src/app/api-services.service';
import { SalesFormHanlingService } from '../sales-form-hanling.service';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesDetailsComponent {
  //products:BookData[]=[]
  book:any[];
  value1=0;
  selectedItem:any;
  suggestions:any[];
  amount:number;
  price:number;

  constructor(private saleService:SalesServiceService, private route:Router, private http: HttpClient,
    private api: APIServicesService,
    private salesformservice:SalesFormHanlingService,
    private loginServ:LoginService){
      this.getBookDetails();
  }

  get products(){
    return this.saleService.products;
  }

  search(event){
    const filtered: any[] = [];
    const query = event.query;
    
    for (let i = 0; i < this.book.length; i++) {
      const book = this.book[i];
        if (book.title.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(book);
        }
    }
    console.log(filtered);
    
    this.suggestions= filtered;
  }

  getBookDetails(){
    this.http.get(`${this.api.bookURL}`).toPromise().then(data=>{
      this.book=data as any[];
    });
    console.log(this.book);
  }

  addtoValue(){
    console.log('selected',this.selectedItem)
    if(this.selectedItem != 'undefined'){
      const book = new BookData(
        this.selectedItem.title,
        this.selectedItem.sellingPrice,
        this.value1,
        this.selectedItem.sellingPrice * this.selectedItem.quantity,
        this.selectedItem.publisherName,
        this.selectedItem.url,
        this.selectedItem.bookAuthors,
        this.selectedItem.bookCategory,
        this.selectedItem.bookCategoryId,
        this.selectedItem.bookId,
        this.selectedItem.inventory,
        this.selectedItem.purchaseDetails,
        this.selectedItem.isbn
      );
      this.saleService.products.push(book);
      console.log(this.salesformservice.billingItems);
      this.salesformservice.billingItems.push(book);
      this.saleService.invoiceAmount += this.selectedItem.sellingPrice * this.selectedItem.quantity;
      console.log( this.saleService.products);
      
    } else {
      
    }

  }

  removetoValue(index:number){
    this.saleService.invoiceAmount -= this.saleService.products[index].sellingPrice;
    this.saleService.products.splice(index,1);
  }

  nextPage(page:string){
    this.saleService.completeSales();
    
    this.route.navigate([`/${page}`]);

  }

  prevPage(page:string){
    this.route.navigate([`/${page}`]);
  }

}
