import express, { Application, Request, Response } from 'express'
const app: Application = express();
import cors from "cors";
import morgan from "morgan"
import router from './config/routeManage';
import globalErrorHandler from './error/globalErrorHandler';
// import httpStatus from 'http-status';


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev')) //this package using we can see reqMethod, response code and response time

app.use('/api/v1', router)

app.use(globalErrorHandler)

// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.status(httpStatus.NOT_FOUND).json({
//         success: false,
//         message: 'Not Found',
//         errorMessage: [{
//             path: req.originalUrl,
//             message: 'API not found'
//         }]
//     })
//     next()
// })

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running')
})



export default app