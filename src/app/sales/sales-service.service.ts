import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BookData } from '../shared/Model/book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SalesFormHanlingService } from './sales-form-hanling.service';
import { Book, GetBook, BookPurchase, SalePurchase, Contact } from '../shared/Model/model'

@Injectable({
  providedIn: 'root'
})
export class SalesServiceService {
  products:BookData[]=[];
  contactInformation:Contact;
  booksForBilling:BookPurchase[] = [];
  salesPurchase:SalePurchase;
  errorData = new Subject<string>();
  invoiceAmount:number = 0;

  constructor(private http:HttpClient, private route:Router, private saleformservice:SalesFormHanlingService) {
    
  }

  //getting sales tax, discount
  getInvoicingDetails(){

  }

  //getting the books that was already fetched - using filtering
  getBooks(){
    //implemented by murugan
  }

  setContactInformation(contactInfo:Contact){
    this.contactInformation = contactInfo;
  }

  getContactInformation(){
    //implemented by mythili
  }

  completeSales(){
    // this.products = this.saleformservice.billingItems;
    // console.log(this.products);
    this.booksForBilling.forEach((values,index)=>{
      this.salesPurchase.salesDetails.push(values);
    });
    this.saleformservice.updateContactInfor(this.contactInformation);
    this.saleformservice.updateSaleInfor();

    this.contactInformation = this.saleformservice.contact;

    this.salesPurchase = this.saleformservice.bllngDetls;

    console.log(this.contactInformation);
    console.log(this.salesPurchase);
    let saleDet = this.salesPurchase;
    console.log(this.saleformservice.bllngDetls);
    this.http.post("https://mg5build.sisystems.com/fwgateway/v1/sale",this.saleformservice.bllngDetls).subscribe(
      (responseData) =>{
        console.log(responseData);
      },(error)=>{
        this.errorData = error;
        console.log(error);
        console.log(this.saleformservice.bllngDetls);
      }
    );
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEiLCJ1bmlxdWVfbmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJuYW1laWQiOiI3NTZmMzg0Yy1iNGIzLTRlMDYtODNiZC1mYmNjYWQ2MzhlMDMiLCJyb2xlIjoiQWRtaW5pc3RyYXRvciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IkRlYyBXZWQgMjcgMjAyMyAxNjowMzo1OSBQTSIsIm5iZiI6MTcwMzY5MjEzOSwiZXhwIjoxNzAzNjkzMDM5LCJpYXQiOjE3MDM2OTIxMzksImlzcyI6InNpc3lzdGVtcy5jb20iLCJhdWQiOiJzaXN5c3RlbXMuY29tIn0.FmB5uA2noIluqWezCm6sFPFqHFdedrm5w5C2ViBzBnM'
   });
    this.http.post("https://mg5build.sisystems.com/fwgateway/v1/contact",
    this.contactInformation,{ headers: reqHeader }
    ).subscribe(
      (responseData) =>{
        console.log(responseData)
      },(error)=>{
        this.errorData = error;
        console.log(error)
      }
    );

    // this.http.post('',this.salesPurchase.salesDetails).subscribe(
    //   (responseData) =>{
    //     console.log(responseData)
    //   },(error)=>{
    //     this.errorData = error;
    //   }
    // )
  }

  totalAmountInBill(invoiceAmt:number){
    let taxedValue = (invoiceAmt-this.discountCalculation(invoiceAmt)) 
    + this.salesTaxCalculation(invoiceAmt);

    return taxedValue;
  }

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
