export class adminUserModal {
    name:string;
    mobile:number;
    address:string;
    email:string;
    password:string;
    imgUrl:File;
    
}
export class adminModal{
    name:string;
    mobile:number;
    address:string;
    email:string;
    password:string;
}

export class productModal{
    productBrandName: string;
    productId: string;
    productPrice: number;
    Description: string;
    productModel: string;
    productImage: [];
    productAvailability: number;
    StarRating: number;
}

export interface adminUserCred{
    email:string;
    password:string;
}