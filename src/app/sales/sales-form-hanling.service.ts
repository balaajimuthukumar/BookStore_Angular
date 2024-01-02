import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NumberFormatStyle } from '@angular/common';
import { BookData } from '../shared/Model/book.model';
import { FormControl, FormGroup } from '@angular/forms';
import { SalesServiceService } from './sales-service.service';
import { BookPurchase, Contact, SalePurchase } from '../shared/Model/model'

@Injectable({
  providedIn: 'root'
})
// public title:string,
// public sellingPrice:number,
// public quantity:number,
// public amount:number,
// public publisherName?:string,
// public url?:string,
// public bookAuthors?:string[],
// public bookCategory?:string,
// public bookCategoryId?:number,
// public bookId?:number,
// public inventory?:number,
// public purchaseDetails?:string[],
// public isbn?:number,

export class SalesFormHanlingService implements OnInit {
  salesFormData:FormGroup;
  contactFormData:FormGroup;
  contact:Contact;
  bllngDetls: SalePurchase;
  billingItems:BookData[] = [];
  selectedBooks:BookPurchase[] = [];
  
  // invoiceDetails:
  constructor(private http: HttpClient) {
    if(this.bllngDetls == undefined){
      this.bllngDetls = {
        customerId:0,
        salesTax:0,
        discountPercent:0,
        discountAmount:0,
        invoiceAmount: 0,
        salesDetails:[]
      }
    }

    if(this.contact == undefined){
      this.contact = {
        id:0,//for put request
        contactName:"",
        phoneNumber:0,
        email:'',
        addressLine1:'',
        addressLine2:'',
        city:'',
        state:'',
        country:''
      }
    }

  }

  ngOnInit(): void {

  }

  getContactInformation():Contact{
    return this.contact;
  }

  updateContactInfor(contact:Contact){
    this.contact = contact;
    this.contactFormData = new FormGroup({
      contactInfo: new FormGroup({
        userName: new FormControl(this.contact.contactName),
        address1: new FormControl(this.contact.addressLine1),
        address2: new FormControl(this.contact.addressLine2),
        city: new FormControl(this.contact.city),
        state: new FormControl(this.contact.state),
        country: new FormControl(this.contact.country)
      })
    });

    // this.http.post("https://mg5build.sisystems.com/fwgateway/v1",this.contact);
  }

  updateSaleInfor(){
    console.log(this.billingItems);
    this.billingItems.forEach((value)=>{
      this.selectedBooks.push({
        bookId:value.bookId,
        qty:value.quantity,
        rate:value.sellingPrice,
        amount:value.amount
      });

      this.bllngDetls = {
        customerId:Math.floor(Math.random()*10000),
        salesTax:10,
        discountPercent:10,
        discountAmount:10,
        invoiceAmount: (this.bllngDetls.invoiceAmount + value.sellingPrice),
        salesDetails:this.selectedBooks
      }
    })

    this.salesFormData = new FormGroup({
      billingDetails: new FormGroup({
        customerId: new FormControl(this.bllngDetls.customerId),
        salesTax: new FormControl(this.bllngDetls.salesTax),
        discountPercent: new FormControl(this.bllngDetls.discountPercent),
        discountAmount: new FormControl(this.bllngDetls.discountAmount),
        invoiceAmount: new FormControl(this.bllngDetls.invoiceAmount),
        salesDetails: new FormControl(this.bllngDetls.salesDetails)
      })
    });
    // this.bllngDetls.salesDetails = this.selectedBooks;
    // this.http.post("https://mg5build.sisystems.com/fwgateway/v1",this.bllngDetls);
  }

   
}
