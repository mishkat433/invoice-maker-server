export type IAuthLogin = {
    email: string,
    password: string
}

export type IAuthUpdatePassword = {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
}

export type IResetType = {
    token: string,
    newPassword: string,
    confirmPassword: string
}