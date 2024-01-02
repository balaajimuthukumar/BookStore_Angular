//Post models
export interface BookPurchase {
    bookId:number,
    qty:number,
    rate:number,
    amount:number
}


export interface Initializer {
    userName:string,
    password:string
}

export interface Menu {
    id?:Number,//for put request
    menuText:string,
    url:string
}

export interface Contact{
    id?:Number,//for put request
    contactName:string,
    phoneNumber:Number,
    email:string,
    addressLine1:string,
    addressLine2:string,
    city:string,
    state:string,
    country:string
}

export interface CustomerVendor {
    id?:Number,//for put request
    vendorName:string,
    contactId:string
}

export interface SalePurchase{
    customerId:number,
    salesTax:number,
    discountPercent:number,
    discountAmount:number,
    invoiceAmount:number,
    salesDetails:BookPurchase[]
}

export interface Book{
    id?:Number,//for put request
    publisherName:string,
    bookCategoryId:Number
    isbn:Number,
    title:string,
    sellingPrice:Number
}

export interface User {
    userName:string,
    email:string,
    password:string,
    roleId:Number
}

export interface Role {
    id?:Number,//for put request
    roleName:string
}

//Put models
export interface UserPut {
    userId:Number,
    userName:string
}

export interface GetBook {
    title:string,
    stock:Number,
    Rate:Number
}