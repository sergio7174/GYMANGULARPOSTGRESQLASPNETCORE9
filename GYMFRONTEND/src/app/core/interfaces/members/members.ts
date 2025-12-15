export interface Members {

    _id:string;
    namemember: string; // name of the member
    client_CI: string; // member CI
    email: string; // member email unique field.....
    phone: string; // member phone
    nameplan: string; // name of the package
    timedays: string ; // # of days
    cost: number; // Price
    code: string; // code of the package 
    finishAt: Date;
    status: string // account status
    imageUser: string;

}
