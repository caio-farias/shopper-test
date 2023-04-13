import { Response } from 'express'
import { orderService } from './order.module'
import { OrderRequestContent } from 'src/types/request'
import { CreateUserAndOrderArgs, UpdateOrderArgs } from './order.service'

export const createOrder = async (req: OrderRequestContent, res: Response) => {
	const { body } = req
	return res.json(
		await orderService.createOrderWithUserNameAndEmail(body as CreateUserAndOrderArgs)
	)
}

export const getOrderById = async (req: OrderRequestContent, res: Response) => {
	const { id } = req.params

	return res.json(await orderService.findOrderById(id))
}

export const getAllOrders = async (req: OrderRequestContent, res: Response) => {
	const { userName, offset, size } = req.query
	return res.json(
		await orderService.findAllOrders({
			where: {
				owner: {
					name: { contains: (userName as string) || undefined },
				},
			},
			include: { owner: true, productsOrdered: true },
			skip: +offset || 0,
			take: +size || 20,
		})
	)
}

export const updateOrderById = async (req: OrderRequestContent, res: Response) => {
	const {
		body,
		params: { id },
	} = req

	return res.json(await orderService.updateOrderById(id, body as UpdateOrderArgs))
}
