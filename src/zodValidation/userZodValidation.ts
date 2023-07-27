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
        }),
        password: z.string({
            required_error: "Password is required"
        }).min(6, { message: 'password must be at least 6 characters' }),
        phone: z.string().optional(),
        image: z.string().optional(),
        address: z.string().optional(),
        companyName: z.string().optional(),
        companyLogo: z.string().optional(),
        voucherName: z.string().optional(),
        signature: z.string().optional(),
        isAdmin: z.string().optional(),
        isBanned: z.string().optional(),
    }),
})

const updateUserZodSchema = z.object({
    body: z.object({
        name: z.object({
            firstName: z.string({
                required_error: "First name is required"
            }).min(3, { message: "Must be 3 or more characters long" }).max(32, { message: "Must be 32 or fewer characters long" }),
            lastName: z.string({
                required_error: "Last name is required"
            }).min(3, { message: "Must be 3 or more characters long" }).max(32, { message: "Must be 32 or fewer characters long" })
        }).optional(),

        email: z.optional(z.string().email("This is not a valid email")),

        password: z.string({
            required_error: "Password is required"
        }).optional(),
        phone: z.string().optional(),
        image: z.string().optional(),
        address: z.string().optional(),
        companyName: z.string().optional(),
        companyLogo: z.string().optional(),
        voucherName: z.string().optional(),
        signature: z.string().optional(),
        isAdmin: z.string().optional(),
        isBanned: z.string().optional(),
    }),
})


export const userValidation = {
    createUserZodSchema,
    updateUserZodSchema
}