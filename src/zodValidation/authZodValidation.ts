import { z } from "zod";


const userLoginZodValidation = z.object({
    body: z.object({

        email: z.string({
            required_error: "Email is required"
        }).email("Please enter a valid email"),

        password: z.string({
            required_error: "Enter a valid password(Must be capital letter, small letter and number)"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character"),
    }),
})


const userPasswordUpdateZodValidation = z.object({
    body: z.object({

        // email: z.string({
        //     required_error: "Email is required"
        // }).email("Please enter a valid email"),

        oldPassword: z.string({
            required_error: "Enter a valid password(Must be capital letter, small letter and number)"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character"),

        newPassword: z.string({
            required_error: "Enter a valid password(Must be capital letter, small letter and number)"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character"),

        confirmPassword: z.string({
            required_error: "New password and confirm password are not match"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character")
    }),
})

const forgetPassZodValidation = z.object({
    body: z.object({

        email: z.string({
            required_error: "Email is required"
        }).email("Please enter a valid email"),
    }),
})

const resetPassZodValidation = z.object({
    body: z.object({
        token: z.string({
            required_error: "Token is not found"
        }),
        newPassword: z.string({
            required_error: "Enter a valid password(Must be capital letter, small letter and number)"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character"),

        confirmPassword: z.string({
            required_error: "New password and confirm password are not match"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character")
    }),
})

export const authZodValidation = {
    userLoginZodValidation,
    userPasswordUpdateZodValidation,
    forgetPassZodValidation,
    resetPassZodValidation
}