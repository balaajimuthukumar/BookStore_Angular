import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIServicesService {
  
  public baseURL = 'https://mg5build.sisystems.com/fwgateway/v1';
  public loginURL = this.baseURL+'/Auth/GetToken';
  public bookURL = this.baseURL+'/book';
  public contactURL = this.baseURL+'/contact';
  public vendorURL =  this.baseURL+'/vendor';
  public customerURL = this.baseURL+'/customer';
  public userURL = this.baseURL+'/userURL';
  public saleURL = this.baseURL+'/sale';
  public purchaseURL = this.baseURL+'/purchase';
  
  public bearerLoginToken: string = '';
  
  constructor() { }
}
