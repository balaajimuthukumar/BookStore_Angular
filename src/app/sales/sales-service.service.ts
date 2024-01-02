import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BookData } from '../shared/Model/book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SalesFormHanlingService } from './sales-form-hanling.service';
import { Book, GetBook, BookPurchase, SalePurchase, Contact } from '../shared/Model/model'
import { APIServicesService } from '../api-services.service';

@Injectable({
  providedIn: 'root'
})
export class SalesServiceService {
  products:BookData[]=[];
  contactInformation:Contact;
  booksForBilling:BookPurchase[] = [];
  salesPurchase:SalePurchase;
  invoiceAmount:number = 0;

  constructor(private http:HttpClient, private route:Router, private saleformservice:SalesFormHanlingService,
    private api:APIServicesService) {
    
  }

  setContactInformation(contactInfo:Contact){
    this.contactInformation = contactInfo;
  }

  completeSales(){
    // this.products = this.saleformservice.billingItems;
    // console.log(this.products);
    let inventoryDetails = [];
    this.booksForBilling.forEach((values,index)=>{
        this.salesPurchase.salesDetails.push(values);

        inventoryDetails.push({
          "bookId": this.products[index].bookId,
          "publisherName": this.products[index].publisherName,
          "bookCategoryId": this.products[index].bookCategoryId,
          "isbn": this.products[index].isbn,
          "title": this.products[index].title,
          "sellingPrice": this.products[index].sellingPrice,
          "inventory":(this.products[index].inventory - values.qty)
        });
      });
      this.saleformservice.updateContactInfor(this.contactInformation);
      this.saleformservice.updateSaleInfor();

      this.contactInformation = this.saleformservice.contact;
      this.salesPurchase = this.saleformservice.bllngDetls;

      this.http.post("https://mg5build.sisystems.com/fwgateway/v1/sale",this.saleformservice.bllngDetls).subscribe(
        (responseData) =>{
          //sales insert response
          console.log(responseData);
          inventoryDetails.forEach((items,index)=>{
            this.http.put(this.api.bookURL+'/'+items.bookId,items).subscribe((response)=>{
              //inventory update response
              console.log(response);
            }, (error)=>{
              //inventory update error response
              console.log(error);
            });
          })
        },(error)=>{
          //sales insert error response
          console.log(error);
        }
      );
      //for authorizaton for the contact API due to security issue
      var reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEiLCJ1bmlxdWVfbmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJuYW1laWQiOiI3NTZmMzg0Yy1iNGIzLTRlMDYtODNiZC1mYmNjYWQ2MzhlMDMiLCJyb2xlIjoiQWRtaW5pc3RyYXRvciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IkRlYyBXZWQgMjcgMjAyMyAxNjowMzo1OSBQTSIsIm5iZiI6MTcwMzY5MjEzOSwiZXhwIjoxNzAzNjkzMDM5LCJpYXQiOjE3MDM2OTIxMzksImlzcyI6InNpc3lzdGVtcy5jb20iLCJhdWQiOiJzaXN5c3RlbXMuY29tIn0.FmB5uA2noIluqWezCm6sFPFqHFdedrm5w5C2ViBzBnM'
    });
      this.http.post("https://mg5build.sisystems.com/fwgateway/v1/contact",
      this.contactInformation,{ headers: reqHeader }
      ).subscribe(
        (responseData) =>{
          //contacts insert response
          console.log(responseData)
        },(error)=>{
          //contacts insert error response
          console.log(error)
        }
      );
  }

  //common function for total amt calculation including the discount
  totalAmountInBill(invoiceAmt:number){
    let taxedValue = (invoiceAmt-this.discountCalculation(invoiceAmt)) 
    + this.salesTaxCalculation(invoiceAmt);

    return taxedValue;
  }

  //common function for discount calculation - returns the percentage or the tax applied value
  discountCalculation(invoiceAmt:number,isPercent?:boolean){
    if(isPercent != undefined){
      return 10;
    }else if(invoiceAmt > 0){
      let discountedValue = invoiceAmt * 0.1;
      return discountedValue;
    }else {
      return 0;
    }
  }

  //common function for sales tax calculation - returns either percentage or tax applied value
  salesTaxCalculation(invoiceAmt:number, isPercent?:boolean){
    if(isPercent != undefined){
      return 10;
    }else if(invoiceAmt > 0 ){
      let salesTax = invoiceAmt * 0.1;
      return salesTax;
    }else {
      return 0;
    }
  }
}
