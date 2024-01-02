export class BookData {
  constructor(
    public title:string,
    public sellingPrice:number,
    public quantity:number,
    public amount:number,
    public publisherName?:string,
    public url?:string,
    public bookAuthors?:string[],
    public bookCategory?:string,
    public bookCategoryId?:number,
    public bookId?:number,
    public inventory?:number,
    public purchaseDetails?:string[],
    public isbn?:number,
  ){}
}