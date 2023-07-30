import mongoose from 'mongoose';
import config from './config';
import app from './app';
// import { errorLogger, logger } from './loggerController/loggerController';
import { Server } from 'http';


process.on('uncaughtException', error => {
    // errorLogger.error(error);
    console.log(error);
    process.exit(1);
});


let server: Server;

async function bootstrap() {
    try {
        await mongoose.connect(config.DATABASE_URL as string)
        // logger.info('Database connected successfully');
        console.log("database connected successfully");

        mongoose.connection.on("error", (error) => {
            // logger.error('database connection error', error)
            console.log('database connection error', error);
        })
    }
    catch (error) {
        // logger.error("failed to connect database", error);
    }

    process.on('unhandledRejection', (err) => {
        if (server) {
            server.close(() => {
                // errorLogger.error(err)
                console.log(err);
            })
        }
        else {
            process.exit(1)
        }
    })
}

app.listen(config.PORT, () => {
    // logger.info(`Server is running at http://localhost:${config.PORT}`);
    console.log(`Server is running at http://localhost:${config.PORT}`);
    bootstrap();
})



process.on('SIGTERM', () => {
    // logger.info('SIGTERM is detect, we are closing our server');
    console.log('SIGTERM is detect, we are closing our server');
    if (server) {
        server.close();
    }
});