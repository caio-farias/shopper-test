import { Request, Response, Router } from 'express'
import { catchErrorHandler } from '../../util/helperHandlers.util'
import { userController } from './user.module'

const router = Router()

router.post(
	'/user',
	catchErrorHandler((req: Request, res: Response) => userController.createUser(req, res))
)

router.get(
	'/user/:id',
	catchErrorHandler((req: Request, res: Response) => userController.getUser(req, res))
)

router.get(
	'/user',
	catchErrorHandler((req: Request, res: Response) => userController.getAllUsers(req, res))
)

router.patch(
	'/user/:id',
	catchErrorHandler((req: Request, res: Response) =>
		userController.updateUserById(req, res)
	)
)

export default router
