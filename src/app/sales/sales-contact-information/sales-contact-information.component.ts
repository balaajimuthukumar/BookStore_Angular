import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../../shared/Model/model'
import { SalesServiceService } from '../sales-service.service';
import { APIServicesService } from 'src/app/api-services.service';
import { SalesFormHanlingService } from '../sales-form-hanling.service';


@Component({
  selector: 'app-sales-contact-information',
  templateUrl: './sales-contact-information.component.html',
  styleUrls: ['./sales-contact-information.component.css']
})
export class SalesContactInformationComponent implements OnInit {
  contact:Contact;
  contactForm:FormGroup;

  constructor(private route: Router, private saleService:SalesServiceService, 
    private formhandlingService:SalesFormHanlingService,
    private http: HttpClient,
    private api: APIServicesService){
      // console.log(this.contactForm);
    }

  ngOnInit(){
    //to prevent error when pressing back button
    if(this.contactForm == undefined){
      this.contactForm = new FormGroup({
        firstName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
        lastName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
        phonenumber: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        addressLine1: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
        addressLine2: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
        city: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
        state: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
        country: new FormControl(null, [Validators.required, Validators.maxLength(20)])
      });
    }    
  }

  //routing + passing value to next page for multi step
  nextPage(page:string){
    let contactDetils =
    {
      contactName: (
        this.contactForm.controls.firstName.value 
        +
        this.contactForm.controls.lastName.value ),
      phoneNumber: this.contactForm.controls.phonenumber.value,
      email: this.contactForm.controls.email.value,
      addressLine1: this.contactForm.controls.addressLine1.value,
      addressLine2: this.contactForm.controls.addressLine2.value,
      city: this.contactForm.controls.city.value,
      state: this.contactForm.controls.state.value,
      country: this.contactForm.controls.country.value
    }
    
    this.formhandlingService.updateContactInfor(contactDetils);
    this.formhandlingService.contactFormData = this.contactForm;
    
    this.saleService.setContactInformation(contactDetils);
    this.route.navigate([`/${page}`]);
  }

}
