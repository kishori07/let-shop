export class UserModal {
    name:string;
    mobile:number;
    address:string;
    email:string;
    password:string;
    
}
export interface userCred{
    email:string;
    password:string;
}
export interface Sum{
    productBrandName: string,
    productQuantity: number,
    productTotalAmt: number,
    productImage:[],
}