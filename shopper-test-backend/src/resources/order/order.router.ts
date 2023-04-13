import { Request, Response, Router } from 'express'
import { catchErrorHandler } from '../../util/util.module'
import { orderController } from './order.module'

const router = Router()

router.post(
	'/order/',
	catchErrorHandler((req: Request, res: Response) =>
		orderController.createOrder(req, res)
	)
)

router.get(
	'/order/',
	catchErrorHandler((req: Request, res: Response) =>
		orderController.getAllOrders(req, res)
	)
)

router.get(
	'/order/:id',
	catchErrorHandler((req: Request, res: Response) =>
		orderController.getOrderById(req, res)
	)
)

router.patch(
	'/order/:id',
	catchErrorHandler((req: Request, res: Response) =>
		orderController.updateOrderById(req, res)
	)
)

export default router
