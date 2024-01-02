import { CustomerVendor, Book } from './model';

// {
//     "customerId": 31,
//     "customerName": "Customer Antony Kanson",
//     "contactId": 7,
//     "sales": []
// }

export interface CustomerResponse {
    customerId:number,
    customerName:string,
    contactId:number
}

// {
//     "bookId": 1137,
//     "publisherName": "Bridget Hills",
//     "bookCategoryId": 3,
//     "isbn": "b",
//     "title": "Lon_Watsica88",
//     "sellingPrice": 145.0,
//     "inventory": 0,
//     "url": null,
//     "bookCategory": null,
//     "bookAuthors": [],
//     "purchaseDetails": []
// }

export interface BookDetails {
    inventory:number,
    url:string,
    bookCategory:string|null,
    bookAuthors:string[],
    purchaseDetails:[]
}

export type BookRepsonse = Book & BookDetails;

export interface saleResponse {
    saleId:string,
    customerId:string,
    salesTax:number,
    discountPrcnt:number,
    discountAmnt:number,
    invoiceAmt:number,
    customer:string|null
    salesDetails:BookAfterSale[]
}

export interface BookAfterSale {
    saleDetailId:number,
    saleId:number,
    bookId:number,
    quantity:number,
    rate:number,
    amount:number
}

// export interface PastPurchase {

// }

export interface VendorAfterPurchase {
    vendroId:number,
    vendorName:string,
    contactId:number,
    // purchases:
}

export interface Purchase {
    purchaseId:number,
    vendorId:number,
    salesTax:number,
    discountPercent:number,
    discountAmount:number,
    invoiceAmount:number,
    invoicenumber:string,
    invoiceUrl:string 
}

export interface vendorPastPurchase {
    purchases: Purchase[]
}

type vendorResponse = CustomerVendor & vendorPastPurchase;

export interface CurrentPurchase {
    vendor: vendorResponse
}

type PurchaseResponse = Purchase & vendorResponse;

// {
//     "purchaseId": 1185,
//     "vendorId": 1,
//     "salesTax": 10.0,
//     "discountPercent": 10,
//     "discountAmount": 0.0,
//     "invoiceAmount": 276.0,
//     "invoicenumber": "IN781990134",
//     "invoiceUrl": "Invoice_1185_20231128180410206.pdf",
//     "vendor": {
//         "vendorId": 1,
//         "vendorName": "Bhupendar Vendor",
//         "contactId": 3,
//         "purchases": []
//     },
//     "purchaseDetails": [
//         {
//             "purchaseDetailId": 1333,
//             "purchaseId": 1185,
//             "bookId": 2,
//             "quantity": 1,
//             "rate": 777.0,
//             "amount": 11.0,
//             "book": {
//                 "bookId": 2,
//                 "publisherName": "SUN Globe",
//                 "bookCategoryId": 1,
//                 "isbn": "kje76",
//                 "title": "Authorization",
//                 "sellingPrice": 250.0,
//                 "inventory": 4,
//                 "url": null,
//                 "bookCategory": {
//                     "bookCategoryId": 1,
//                     "bookCategoryName": "Action And Adventures",
//                     "books": []
//                 },
//                 "bookAuthors": [],
//                 "purchaseDetails": []
//             }
//         }
//     ]
// }
