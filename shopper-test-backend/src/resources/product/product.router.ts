import { Router, Request, Response } from 'express'
import { catchErrorHandler } from '../../util/util.module'
import { productController } from './product.module'

const router = Router()

router.get(
	'/product/:id',
	catchErrorHandler((req: Request, res: Response) =>
		productController.getProductById(req, res)
	)
)

router.get(
	'/product',
	catchErrorHandler((req: Request, res: Response) =>
		productController.getAllProducts(req, res)
	)
)

router.post(
	'/product',
	catchErrorHandler((req: Request, res: Response) =>
		productController.createProduct(req, res)
	)
)

router.patch(
	'/product/:id',
	catchErrorHandler((req: Request, res: Response) =>
		productController.updateProductById(req, res)
	)
)

export default router
