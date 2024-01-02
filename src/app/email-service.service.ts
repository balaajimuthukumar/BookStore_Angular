// email.service.ts
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmailResponse {
    
}

@Injectable({
  providedIn: 'root'})export class EmailService {

  private apiUrl = 'https://api.sendgrid.com/v3/mail/send';
  private apiKey = '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';

  constructor(private http: HttpClient) { }

  sendEmail(emailData: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`    });
    return this.http.post(this.apiUrl, emailData, { headers });
  }

  private handleError(httpError: HttpErrorResponse){

  }   
}