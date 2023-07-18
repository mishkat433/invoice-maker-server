import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { logger } from './loggerController/loggerController';

async function bootstrap() {
    try {
        await mongoose.connect(config.DATABASE_URL as string)
        logger.info('Database connected successfully');

        mongoose.connection.on("error", (error) => {
            logger.error('database connection error', error)
        })
    }
    catch (error) {
        logger.error("failed to connect database", error);
    }
}

app.listen(config.PORT, () => {
    logger.info(`Server is running at http://localhost:${config.PORT}`);
    bootstrap();
})

