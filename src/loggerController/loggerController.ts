import { createLogger, format, transports } from 'winston';
import path from "path";
const { combine, timestamp, label, printf } = format;
import DailyRotateFile from 'winston-daily-rotate-file';


// custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {

    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return ` [${label}] ${level}: ${message} ${date.toDateString()} ${hours % 12} : ${minutes} : ${seconds}`;
});



const logger = createLogger({
    level: 'info',
    format: combine(
        format.colorize(),
        label({ label: 'IM' }),
        timestamp(),
        myFormat,
        // prettyPrint()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(process.cwd(), 'log', 'successes', 'success-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '1sd'
        })
    ],
});

const errorLogger = createLogger({
    level: 'error',
    format: combine(
        label({ label: 'IM' }),
        timestamp(),
        myFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(process.cwd(), 'log', 'errors', 'error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '2d'
        })
    ],
});



export { logger, errorLogger };