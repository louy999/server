import express, {Request, Response, NextFunction} from 'express'
import Error from '../interface/error.interface'

const errHandleMiddleware = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const status = error.status || 500
	const message = error.message || `something error `
	res.status(status).json({
		status,
		message,
	})
}

export default errHandleMiddleware
