import { z } from "zod"


const createUserZodSchema = z.object({
    body: z.object({
        name: z.object({
            firstName: z.string({
                required_error: "First name is required"
            }).min(3, { message: "Must be 3 or more characters long" }).max(32, { message: "Must be 32 or fewer characters long" }),
            lastName: z.string({
                required_error: "Last name is required"
            }).min(3, { message: "Must be 3 or more characters long" }).max(32, { message: "Must be 32 or fewer characters long" })
        }),
        email: z.string({
            required_error: "Email is required"
        }).email("Please enter a valid email"),

        password: z.string({
            required_error: "Enter a valid password(Must be capital letter, small letter and number)"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character"),

        phone: z.string().optional(),
        image: z.string().optional(),
        address: z.string().optional(),
        companyName: z.string().optional(),
        companyLogo: z.string().optional(),
        voucherName: z.string().optional(),
        signature: z.string().optional(),

        isAdmin: z.optional(z.boolean({
            required_error: "isAdmin is required",
            invalid_type_error: "isAdmin is must be a boolean"
        })),
        isBanned: z.optional(z.boolean({
            required_error: "isBanned is required",
            invalid_type_error: "isBanned is must be a boolean"
        })),
    }),
})

const updateUserZodSchema = z.object({
    body: z.object({
        name: z.optional(z.object({
            firstName: z.string({
                required_error: "First name is required"
            }).nonempty({ message: "First name is required" }),
            lastName: z.string({
                required_error: "Last name is required"
            }).nonempty({ message: "Last name is required" })
        })),

        email: z.optional(z.string().email("Please enter a valid email")),

        password: z.optional(z.string({
            required_error: "Enter a valid password(Must be capital letter, small letter and number)"
        }).regex(/^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/, "Must be capital letter, small letter and number").min(6, "password must be at least 6 character")),

        phone: z.optional(z.string({ required_error: "Please enter a valid phone number" }).min(11).max(11)),

        image: z.string().optional(),

        address: z.optional(z.string({ required_error: "Please enter a valid address" })),

        companyName: z.optional(z.string({ required_error: "Please enter a valid company name" })),

        companyLogo: z.string().optional(),

        voucherName: z.optional(z.string({ required_error: "Please enter a valid voucher name" })),

        signature: z.string().optional(),

        isAdmin: z.optional(z.boolean({
            required_error: "isAdmin is required",
            invalid_type_error: "isAdmin is must be a boolean"
        })),
        isBanned: z.optional(z.boolean({
            required_error: "isBanned is required",
            invalid_type_error: "isBanned is must be a boolean"
        })),
    }),
})


export const userValidation = {
    createUserZodSchema,
    updateUserZodSchema
}

// /^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/