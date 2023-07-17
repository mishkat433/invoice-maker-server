import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../interface/userInterface";

type UserModel = Model<IUser, object>;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
        trim: true,
        maxlength: [32, 'User name must be at least 3-32 characters'],
        minlength: [3, 'User name must be at least 3-32 characters']
    },
    email: {
        type: String,
        unique: true,
        required: [true, "User email is required"],
        error: 'email is already in use',
        trim: true,
        lowercase: true,
        validate: {
            validator: function (email: string): boolean {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
            },
            message: 'Please enter a valid email address'
        }
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, 'User password must be minimum 6 characters'],
        validate: {
            validator: function (password: string): boolean {
                return /^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/.test(password)
            },
            message: 'Please enter a valid password'
        },
        set: (v: string | Buffer) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    image: {
        type: String,
    },
    address: {
        type: String,
    },
    companyName: {
        type: String,
    },
    companyLogo: {
        type: String,
    },
    voucherName: {
        type: String,
    },
    sealerSignature: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


export const User = model<IUser, UserModel>('User', userSchema);