
import express, { Application, NextFunction, Request, Response, ErrorRequestHandler } from 'express'
const app: Application = express();
import cors from "cors";
import morgan from "morgan"
import createError from 'http-errors'
import router from './config/routeManage';
// import httpStatus from 'http-status';
import globalErrorHandler from './error/globalErrorHandler';


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev')) //this package using we can see reqMethod, response code and response time

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running')
})

app.use((req, res, next) => {
    next(createError(404, 'route not found'))
    next()
})

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({ message: err })
    next()
})

app.use(globalErrorHandler)

// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.status(400).json({
//         success: false,
//         message: 'not found',
//         errorMessage: [
//             {
//                 path: req.originalUrl,
//                 message: 'Invalid url',
//             },
//         ],
//     });
//     next();
// });




export default app