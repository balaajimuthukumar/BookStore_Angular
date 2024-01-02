import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookData } from '../../shared/Model/book.model';
import { APIServicesService } from 'src/app/api-services.service';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details-component.component.html',
  styleUrls: ['./purchase-details-component.component.css']
})
export class PurchaseDetailsComponent {
  products:BookData[]=[]
  book:any[];
  value1=0;
  qty:number[] = [];
  selectedItem:any;
  suggestions:any[];
  amount:number;
  price:number;

  allPurchaseDetail:any[] = [];
  
  purDetails:any = []
  constructor(
    private route:Router, 
    private http: HttpClient,
    private api: APIServicesService
){
      this.getBookDetails();
      this.getPurchaseDetails();
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
    // console.log(filtered);
    this.suggestions= filtered;
  }

  getBookDetails(){
    this.http.get(`${this.api.bookURL}`).toPromise().then(data=>{
      this.book=data as any[];
    });
    // console.log(this.book);
  }

  getPurchaseDetails(){
    this.http.get(this.api.purchaseURL).subscribe((responseData)=>{
      
      this.allPurchaseDetail = responseData as any[];
      // console.log(this.allPurchaseDetail);
    },(error)=>{
      console.log(error);
    });
  }

  addtoValue(){
    // console.log('selected',this.selectedItem)
    if(this.selectedItem != 'undefined'){
      this.qty.push(this.value1);
      const book = new BookData(
        this.selectedItem.title,
        this.selectedItem.sellingPrice,
        this.value1,
        this.value1 * this.selectedItem.sellingPrice,
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
      this.products.push(book);
      // console.log( this.products);

      this.selectedItem = {};
      this.value1 = 0;
    } else {
      
    }

  }

  removetoValue(index:number){
    this.products.splice(index,1);
    this.qty.splice(index,1);
  }

  onSubmit(){
    this.completePurchase();

    this.products.forEach((items,index)=>{
      this.removetoValue(index);
    })

  }

  nextPage(page:string){
    this.route.navigate([`/${page}`]);
  }

  prevPage(page:string){
    this.route.navigate([`/${page}`]);
  }

  completePurchase(){
    let purchaseDetail:any = {};
    let inventoryDetails:any[] = [];
    console.log(this.products);
    this.products.forEach((item,index)=>{
      if(Object.keys(purchaseDetail).length == 0){
        purchaseDetail = {
          "vendorId": 1,
          "salesTax": 10,
          "discountPercent": 10,
          "discountAmount": (item.sellingPrice - (item.sellingPrice * 0.10)),
          "invoiceAmount": item.sellingPrice,
          "purchaseDetails": []
        }
      }

      inventoryDetails.push({
        "bookId": item.bookId,
        "publisherName": item.publisherName,
        "bookCategoryId": item.bookCategoryId,
        "isbn": item.isbn,
        "title": item.title,
        "sellingPrice": item.sellingPrice,
        "inventory":item.inventory + this.qty[index]
      });

      //to use it later for updating the inventory
      this.purDetails.push({
        "bookId": item.bookId,
        "quantity": this.qty[index],
        "rate": item.sellingPrice,
        "amount": item.amount
      });

      purchaseDetail.purchaseDetails.push(this.purDetails[(this.purDetails.length-1)]);
    });
    console.log(inventoryDetails);
    this.http.post(this.api.purchaseURL,purchaseDetail).subscribe((response)=>{
      console.log(response);
      //updating the inventory via separate API
      inventoryDetails.forEach((items,index)=>{
        this.http.put(this.api.bookURL+'/'+items.bookId,items).subscribe((response)=>{
          console.log(response);
        }, (error)=>{
          console.log(error);
        });
      })
    }, (error)=>{
      console.log(error);
    });

  }

}
