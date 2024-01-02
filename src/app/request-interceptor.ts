import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { EmailService } from "./email-service.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private emailService:EmailService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("testing");
        return next.handle(req);
    }
}