
import { Response, Request, NextFunction, ErrorRequestHandler } from "express";

const globalErrorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ err: err })
    next()
}

export default globalErrorHandler;