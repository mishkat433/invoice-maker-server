"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authZodValidation = void 0;
const zod_1 = require("zod");
const userLoginZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required"
        }).email("Please enter a valid email"),
        password: zod_1.z.string({
            required_error: "Enter a valid password(Must be capital letter, small letter and number)"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character"),
    }),
});
const userPasswordUpdateZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        // email: z.string({
        //     required_error: "Email is required"
        // }).email("Please enter a valid email"),
        oldPassword: zod_1.z.string({
            required_error: "Enter a valid password(Must be capital letter, small letter and number)"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character"),
        newPassword: zod_1.z.string({
            required_error: "Enter a valid password(Must be capital letter, small letter and number)"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character"),
        confirmPassword: zod_1.z.string({
            required_error: "New password and confirm password are not match"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character")
    }),
});
const forgetPassZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required"
        }).email("Please enter a valid email"),
    }),
});
const resetPassZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        token: zod_1.z.string({
            required_error: "Token is not found"
        }),
        newPassword: zod_1.z.string({
            required_error: "Enter a valid password(Must be capital letter, small letter and number)"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character"),
        confirmPassword: zod_1.z.string({
            required_error: "New password and confirm password are not match"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character")
    }),
});
exports.authZodValidation = {
    userLoginZodValidation,
    userPasswordUpdateZodValidation,
    forgetPassZodValidation,
    resetPassZodValidation
};
