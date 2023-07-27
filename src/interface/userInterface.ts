import { Model } from "mongoose";



export type UserName = {
    firstName: string;
    lastName: string;
    middleName: string;
};

export type IUser = {
    name: UserName,
    email: string,
    phone: string,
    password: string,
    image: string,
    address: string,
    companyName: string,
    companyLogo: string,
    voucherName: string,
    sealerSignature: string,
    isAdmin: boolean,
    isBanned: boolean,
}



export type UserModel = Model<IUser, object>;