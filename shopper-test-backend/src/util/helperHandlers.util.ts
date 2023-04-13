import { NextFunction, Request, Response } from 'express'
import { enumStatusCode } from './error.enum'

export class HttpException extends Error {
	status: number
	constructor(status: number, message?: string) {
		super(message)
		this.name = 'HtppException'
		this.status = status
		Object.setPrototypeOf(this, HttpException.prototype)
	}
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
	res.status(404).json()
	return next()
}

export const errorHandler = (
	err,
	request: Request,
	response: Response,
	next: NextFunction
) => {
	console.log(err)
	if (err instanceof HttpException)
		return response.status(err.status).send({
			status: err.status,
			message: err.message,
		})
	if (err instanceof Error)
		return response.status(enumStatusCode.INTERNAL_SERVER_ERROR).send({
			status: enumStatusCode.INTERNAL_SERVER_ERROR,
			message: err.message,
		})

	return next()
}

export const catchErrorHandler =
	(func) => (request: Request, response: Response, next: NextFunction) =>
		Promise.resolve(func(request, response, next)).catch(next)
