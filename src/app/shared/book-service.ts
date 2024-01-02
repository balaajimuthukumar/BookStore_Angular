import { GetBook } from "./Model/model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BookRepsonse } from "./Model/post-response-model";
import { APIServicesService } from "../api-services.service";
import { BookData } from "./Model/book.model";

@Injectable({
    providedIn:'root'
})
export class BookService {
    books:BookData[] = [];
    book:GetBook;
    allBooks:BookRepsonse[];

    constructor(private http: HttpClient, private apiservice:APIServicesService){

    }

    fetchBook(){
        this.http.get<BookData[]>(this.apiservice.baseURL + '/book').subscribe(
            (response)=>{
                // books = response;
                for(let obj in response){
                    this.books.push(response[obj]);
                }
            }
        );

        // forEach((obs)=>{
        //         // books = response;
        //         for(let obj in response){
        //             this.books.push(response[obj]);
        //         }
        // });

        this.http.get<GetBook>("https://ng-complete-guide-cfa6f-default-rtdb.firebaseio.com/Books.json").subscribe(
            (response)=>{
                // books = response;
                for(let obj in response){
                    this.books.push(response[obj]);
                }
            }
        );
        
        return;
    }

    setBook(books:BookData[]){
        this.books = books;
    }
}