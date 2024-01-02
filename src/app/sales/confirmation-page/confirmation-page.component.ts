import { Router } from '@angular/router';
import { Component } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { BookData } from 'src/app/shared/Model/book.model';
import { EmailService } from '../../email-service.service';
import { SalesServiceService } from '../sales-service.service';
import{ Contact, SalePurchase } from '../../shared/Model/model';
import { SalesFormHanlingService } from '../sales-form-hanling.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Product{
  name: string;
  price: number;
  qty: number;
}
class Invoice{
  customerName: string;
  address: string;
  contactNo: number;
  email: string;
  
  products: any[] = [];
  additionalDetails: string;

  constructor(){
    // Initially one empty product row we will show 
    
  }
}
@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent {
  products: BookData[] = [];
  invoice = new Invoice();
  contactInfromation:Contact;
  billingDetails:SalePurchase;

  items = [
    {
      label: 'Home',
      icon: 'pi pi-home'
    },
    {
      label: 'About',
      icon: 'pi pi-info'
    },
    // ... other menu items
  ];

  // set products(product:any[]){
  //   this.products = [];
  // }

  // get products(){    
  //   console.log(this.salesService.products);
  //   return this.salesService.products;
  // }
  constructor( private emailService:EmailService, private salesService:SalesServiceService, private route: Router,
    private formhandlingService:SalesFormHanlingService){
    this.products = this.formhandlingService.billingItems;
      console.log(this.products);
      this.contactInfromation = {    
        id:0,//for put request
        contactName:"",
        phoneNumber:0,
        email:"",
        addressLine1:"",
        addressLine2:"",
        city:"",
        state:"",
        country:""
      }

      this.billingDetails = 
        {
          customerId:0,
          salesTax:0,
          discountPercent:0,
          discountAmount:0,
          invoiceAmount:0,
          salesDetails:[
         ]
        }
      this.billingDetails = this.formhandlingService.bllngDetls;console.log(this.formhandlingService.getContactInformation());
      this.contactInfromation = this.formhandlingService.contact;
  }
  
  nextPage(page:string){
    this.route.navigate([`/${page}`]);
  }
  
  ngOnInit(){
    // console.log("inside the confirmaiton page");
    // console.log(this.products);
  }

  //for send grid api - email operation
  // sendEmail() {
  //   const emailData = {
  //     personalizations: [
  //       {          
  //       to: [{email: 'mbalaji1995@gmail.com'}],          
  //       subject: 'Your Email Subject'        
  //       }
  //     ],      
  //     from: { email: 'mbalaji1995@gmail.com'},      
  //     content: [
  //       {          
  //         type: 'text/plain',
  //         value: 'Test Email Content.'
  //       }
  //     ]
  //   };

  //   this.emailService.sendEmail(emailData)
  //     .subscribe(response => {
  //       console.log('Email sent successfully:', response);
  //     }, error => {
  //       console.error('Error sending email:', error);
  //     });
  // }


  generatePDF(action = 'open') {
    
    let pdfBody =  [];
    pdfBody.push([{text: 'Title', colspan:"2", style: 'tableHeader'},{text:'',style: 'tableHeader'},{text:'',style: 'tableHeader'}, {text: 'Price', style: 'tableHeader'}, {text: 'Total', style: 'tableHeader'},{text: 'Qty', style: 'tableHeader'}]);
    
    // this.products.forEach(
    //   (books, index)=>{
    //     if(!index){
    //       pdfBody.push([{colSpan: 3, text: books.title}, '','', books.sellingPrice, books.amount,books.quantity])
    //     }else{
    //       pdfBody.push([books.title,'','', books.sellingPrice, books.amount,books.quantity])
    //     }
    //   }
    // );

    this.billingDetails.salesDetails.forEach(
      (books, index)=>{
        if(!index){
          pdfBody.push([{colSpan: 3, text: this.products[index].title}, '','', books.rate, books.amount,books.qty])
        }else{
          pdfBody.push([this.products[index].title,'','', books.rate, books.amount,books.qty])
        }
      }
    )

    let milliseconds = new Date().getTime();
    let currentDate = new Date(milliseconds);

    let docDefinition = {
      content: [//content related to the PDF page
        {text: 'Address', style: 'header'},//single row with header style - style at the bottom
        'Book store name',//single row
        'Book store address',
        'Book store phone no',
        'Book store email',
        {text: '\n\n\n\n\n', style: 'subheader'},
        {//table structure
          style: 'tableExample',
          table: {
            headerRows: 1,//no of headers
            body: [//content for n number of columns
              [{text: 'Bill To:', style: 'header'}, {text: 'Invoice No: xxxxxxx', style: 'header'}],
              [this.contactInfromation.contactName, 'Invoice Date: '+ currentDate.toLocaleDateString()],
              [this.contactInfromation.addressLine1+'\n'+this.contactInfromation.addressLine2, 'Payment Due: ' + currentDate.toLocaleDateString()],
              ['buyer phone:',this.contactInfromation.phoneNumber],
              ['buyer email:',this.contactInfromation.email]
            ]
          },
          layout: 'noBorders'//table without border lines
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: pdfBody
          },
          layout: 'headerLineOnly'//table with header lines
        },
        {text: 'Sub total:              ' + this.billingDetails.invoiceAmount, margin: [80, 0, 0, 0], style:'finalDetails'},//single row with indentation
        {text: 'Tax 0.00%:            ' + this.salesService.salesTaxCalculation(0,true), margin: [80, 0, 0, 0], style:'finalDetails'},
        {text: 'Fees/discounts:  ' + this.salesService.discountCalculation(0,true)+'%', margin: [80, 0, 0, 0], style:'finalDetails'},
        {text: 'Total:                     ' + this.salesService.totalAmountInBill(this.billingDetails.invoiceAmount), margin: [80, 0, 0, 0], style:'finalDetails',background:'#ffe4c4'},
      ],
      styles: {//style classes
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
          fillColor:'#ffe4c4'
        },
        finalDetails: {
            bold:true
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }
      
    };

    if(action==='download'){
      //download pdf file
      pdfMake.createPdf(docDefinition).download();
    }else if(action === 'print'){
      //open pdf in new tab and enable ctrl + P option
      pdfMake.createPdf(docDefinition).print();      
    }else{
      //open pdf in new tab
      pdfMake.createPdf(docDefinition).open();      
    }

  }

}
