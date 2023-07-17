import mongoose from 'mongoose';
import config from './config';
import app from './app';

async function bootstrap() {
    try {
        await mongoose.connect(config.DATABASE_URL as string)
        console.log('Database connected successfully');

        mongoose.connection.on("error", (error) => {
            console.error('database connection error', error)
        })
    }
    catch (error) {
        console.log("failed to connect database", error);
    }
}

app.listen(config.PORT, () => {
    console.log(`Server is running at http://localhost:${config.PORT}`);
    bootstrap();
})

