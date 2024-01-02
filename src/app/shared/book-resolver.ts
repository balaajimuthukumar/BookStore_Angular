import { Injectable } from "@angular/core";
import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Book, GetBook } from "./Model/model";
import { BookService } from "./book-service";

@Injectable({
    providedIn:'root'
})
export class BookResolver implements Resolve<GetBook[]|boolean> {
    constructor(private bookService:BookService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ){
        //check if the books are empty and do only if required
        console.log(this.bookService.books);
        if(this.bookService.books.length == 0){
            console.log("message");
            this.bookService.fetchBook();
        }
        
        return true;
    }
}