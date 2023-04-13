import { Request, NextFunction, Response } from 'express'

export const authorizationMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	next()
}
