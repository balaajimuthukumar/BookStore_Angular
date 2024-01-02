export enum Unit {
    Dollar = "$",
    Rupees = "Rs",
  }
  
export type UnitType = Unit.Dollar|Unit.Rupees;

export interface Book {
    author:string;
    publisher:string;
    title:string;
    sellingprice:number;
    url:string;
    unit:UnitType;
}
