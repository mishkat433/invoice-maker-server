import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
    PORT: process.env.PORT || 5300,
    DATABASE_URL: process.env.DATABASE_URL,
    env: process.env.NODE_ENV,
    JWT_SECRET: process.env.jWT_ACTIVATION_KEY || '451d5ac7e5b7912fd408310dbccdf0cd49c9f72b58c53af630e421dd580b460ad2ca3f7f344deeb1',
    SMTP_USERNAME: process.env.GOOGLE_SMTP_MAIL_APP_USERNAME,
    SMTP_PASSWORD: process.env.GOOGLE_SMTP_MAIL_APP_PASSWORD,
    CLINT_URL: process.env.CLINT_URL
}