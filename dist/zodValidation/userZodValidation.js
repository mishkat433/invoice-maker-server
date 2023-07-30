"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First name is required"
            }).min(3, { message: "Must be 3 or more characters long" }).max(32, { message: "Must be 32 or fewer characters long" }),
            lastName: zod_1.z.string({
                required_error: "Last name is required"
            }).min(3, { message: "Must be 3 or more characters long" }).max(32, { message: "Must be 32 or fewer characters long" })
        }),
        email: zod_1.z.string({
            required_error: "Email is required"
        }).email("Please enter a valid email"),
        password: zod_1.z.string({
            required_error: "Enter a valid password(Must be capital letter, small letter and number)"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character"),
        phone: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        companyName: zod_1.z.string().optional(),
        companyLogo: zod_1.z.string().optional(),
        voucherName: zod_1.z.string().optional(),
        signature: zod_1.z.string().optional(),
        isAdmin: zod_1.z.optional(zod_1.z.boolean({
            required_error: "isAdmin is required",
            invalid_type_error: "isAdmin is must be a boolean"
        })),
        isBanned: zod_1.z.optional(zod_1.z.boolean({
            required_error: "isBanned is required",
            invalid_type_error: "isBanned is must be a boolean"
        })),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.optional(zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First name is required"
            }).nonempty({ message: "First name is required" }),
            lastName: zod_1.z.string({
                required_error: "Last name is required"
            }).nonempty({ message: "Last name is required" })
        })),
        email: zod_1.z.optional(zod_1.z.string().email("Please enter a valid email")),
        password: zod_1.z.optional(zod_1.z.string({
            required_error: "Enter a valid password(Must be capital letter, small letter and number)"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character")),
        phone: zod_1.z.optional(zod_1.z.string({ required_error: "Please enter a valid phone number" }).min(11).max(11)),
        image: zod_1.z.string().optional(),
        address: zod_1.z.optional(zod_1.z.string({ required_error: "Please enter a valid address" })),
        companyName: zod_1.z.optional(zod_1.z.string({ required_error: "Please enter a valid company name" })),
        companyLogo: zod_1.z.string().optional(),
        voucherName: zod_1.z.optional(zod_1.z.string({ required_error: "Please enter a valid voucher name" })),
        signature: zod_1.z.string().optional(),
        isAdmin: zod_1.z.optional(zod_1.z.boolean({
            required_error: "isAdmin is required",
            invalid_type_error: "isAdmin is must be a boolean"
        })),
        isBanned: zod_1.z.optional(zod_1.z.boolean({
            required_error: "isBanned is required",
            invalid_type_error: "isBanned is must be a boolean"
        })),
    }),
});
exports.userValidation = {
    createUserZodSchema,
    updateUserZodSchema
};
// /^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/
