import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser, UserModel } from "../interface/userInterface";



const userSchema = new Schema({
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
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
    password: {
        type: String,
        minlength: [6, 'User password must be minimum 6 characters'],
        validate: {
            validator: function (pass: string): boolean {
                return /^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/.test(pass)
            },
            message: 'Password must be capital letter, small letter and number'
        },
        required: [true, "password is required"],
        set: (v: string) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    phone: {
        type: String,
        default: null
    },

    image: {
        type: String,
        default: '../../public/images/users/user.png'
    },
    address: {
        type: String,
        default: null
    },
    companyName: {
        type: String,
        default: null
    },
    companyLogo: {
        type: String,
        default: null
    },
    voucherName: {
        type: String,
        default: null
    },
    signature: {
        type: String,
        default: null
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true, toJSON: {
        virtuals: true,
    }
})


export const User = model<IUser, UserModel>('User', userSchema);