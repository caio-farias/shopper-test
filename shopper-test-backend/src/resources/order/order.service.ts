import { Prisma, productStock } from '@prisma/client'
import { productStockService } from '../product/product.module'
import { HttpException, enumStatusCode, generateMap } from '../../util/util.module'
import prisma from '../../config/db/prisma'

export enum OrderServiceErrorMessage {
	ORDER_NOT_FOUND = 'Order not found.',
	ORDERS_NOT_FOUND = 'No order found.',
	PRODUCT_OUT_OF_STOCK = 'Product out of stock.',
	INVALID_PRODUCT = 'Product ordered is invalid.',
}

export interface CreateOrderArgs {
	ownerId: string
	stockId: string
	deliveryDate: Date
	productsToBeOrdered: {
		id: string
		qty: number
	}[]
}

export interface CreateUserAndOrderArgs {
	stockId: string
	userEmail: string
	userName: string
	deliveryDate: Date
	productsToBeOrdered: {
		id: string
		qty: number
	}[]
}

export type UpdateOrderArgs = Prisma.orderUpdateInput

export const createOrder = async (orderDto: CreateOrderArgs) => {
	//validation
	const { productsToBeOrdered } = orderDto
	const mapProductOrdered = generateMap(productsToBeOrdered, 'id', 'qty')
	const productIds = productsToBeOrdered.map((p) => p.id)

	const productsInStock = await productStockService.findAllProducts({
		where: { id: { in: productIds } },
	})

	if (productsInStock.length < productIds.length)
		throw new HttpException(
			enumStatusCode.UNPROCESSABLE_ENTITY,
			OrderServiceErrorMessage.INVALID_PRODUCT
		)

	const productOutOfStock = productsInStock.find(
		({ id, qtyStock }) => qtyStock < mapProductOrdered[id]
	)

	if (productOutOfStock)
		throw new HttpException(
			enumStatusCode.UNPROCESSABLE_ENTITY,
			OrderServiceErrorMessage.PRODUCT_OUT_OF_STOCK
		)

	return await createOrderTransaction(orderDto, productsInStock, mapProductOrdered)
}

export const createOrderWithUserNameAndEmail = async (
	orderDto: CreateUserAndOrderArgs
) => {
	//validation
	const { productsToBeOrdered } = orderDto
	const mapProductOrdered = generateMap(productsToBeOrdered, 'id', 'qty')
	const productIds = productsToBeOrdered.map((p) => p.id)

	const productsInStock = await productStockService.findAllProducts({
		where: { id: { in: productIds } },
	})

	if (productsInStock.length < productIds.length)
		throw new HttpException(
			enumStatusCode.UNPROCESSABLE_ENTITY,
			OrderServiceErrorMessage.INVALID_PRODUCT
		)

	const productOutOfStock = productsInStock.find(
		({ id, qtyStock }) => qtyStock < mapProductOrdered[id]
	)

	if (productOutOfStock)
		throw new HttpException(
			enumStatusCode.UNPROCESSABLE_ENTITY,
			OrderServiceErrorMessage.PRODUCT_OUT_OF_STOCK
		)

	return await createOrderAndUserTransaction(orderDto, productsInStock, mapProductOrdered)
}

export const findOrder = async (findArgs: Prisma.orderFindFirstArgs) => {
	const order = await prisma.order.findFirst(findArgs)
	if (!order) throw new Error(OrderServiceErrorMessage.ORDER_NOT_FOUND)
	return order
}

export const findOrderById = async (id: string) => {
	const order = await prisma.order.findUnique({
		where: { id },
		include: {
			owner: true,
			stock: true,
			productsOrdered: true,
		},
	})
	if (!order) throw new Error(OrderServiceErrorMessage.ORDER_NOT_FOUND)
	return order
}

export const findAllOrders = async (findManyArgs: Prisma.orderFindManyArgs) => {
	return await prisma.order.findMany(findManyArgs)
}

export const updateOrderById = async (id: string, data: UpdateOrderArgs) => {
	await findOrder({ where: { id }, include: { owner: true } })
	return await prisma.order.update({
		where: { id },
		include: { owner: true, stock: true, productsOrdered: true },
		data,
	})
}

const createOrderAndUserTransaction = async (
	orderDto: CreateUserAndOrderArgs,
	productsInStock: productStock[],
	mapProductOrdered: { key?: string; value?: number }
) => {
	return await prisma.$transaction(async (prismaTransaction) => {
		const { userEmail, userName, stockId, deliveryDate } = orderDto

		let user = await prismaTransaction.user.findUnique({ where: { email: userEmail } })
		console.log(user)
		if (!user) {
			user = await prismaTransaction.user
				.create({
					data: {
						name: userName,
						email: userEmail,
					},
				})
				.catch((e) => {
					console.log(e)
					throw Error('Could not create user.')
				})
		}

		const order = await prismaTransaction.order
			.create({
				data: {
					ownerId: user.id,
					stockId,
					deliveryDate,
					status: 'pending',
				},
			})
			.catch((e) => {
				console.log(e)
				throw Error('Could not create order.')
			})

		const productsOrderedPromises = productsInStock.map(
			({ id, name, brand, category, price }) =>
				prismaTransaction.productOrdered.create({
					data: {
						name,
						brand,
						category,
						price,
						qty: mapProductOrdered[id],
						orderId: order.id,
						productInStockId: id,
					},
				})
		)

		const productsOrdered = await Promise.all(productsOrderedPromises).catch((e) => {
			console.log(e)
			throw Error('Could order products.')
		})

		const orderPrice = productsOrdered.reduce(
			(total, { price, qty }) => total + price * qty,
			0
		)

		const updateProductsInStock = productsInStock.map(({ id }) =>
			prismaTransaction.productStock.update({
				where: { id },
				data: {
					qtyStock: {
						decrement: mapProductOrdered[id],
					},
				},
			})
		)

		await Promise.all(updateProductsInStock)

		return await prismaTransaction.order
			.update({
				where: { id: order.id },
				data: {
					status: 'confirmed',
					orderPrice,
				},
				include: {
					stock: true,
					owner: true,
					productsOrdered: true,
				},
			})
			.catch((e) => {
				console.log(e)
				throw Error('Could not initialize order.')
			})
	})
}

const createOrderTransaction = async (
	orderDto: CreateOrderArgs,
	productsInStock: productStock[],
	mapProductOrdered: { key?: string; value?: number }
) => {
	return await prisma.$transaction(async (prismaTransaction) => {
		const { ownerId, stockId, deliveryDate } = orderDto
		const order = await prismaTransaction.order
			.create({
				data: {
					ownerId,
					stockId,
					deliveryDate,
					status: 'pending',
				},
			})
			.catch((e) => {
				console.log(e)
				throw Error('Could not create order.')
			})

		const productsOrderedPromises = productsInStock.map(
			({ id, name, brand, category, price }) =>
				prismaTransaction.productOrdered.create({
					data: {
						name,
						brand,
						category,
						price,
						qty: mapProductOrdered[id],
						orderId: order.id,
						productInStockId: id,
					},
				})
		)

		const productsOrdered = await Promise.all(productsOrderedPromises).catch((e) => {
			console.log(e)
			throw Error('Could order products.')
		})

		const orderPrice = productsOrdered.reduce(
			(total, { price, qty }) => total + price * qty,
			0
		)

		const updateProductsInStock = productsInStock.map(({ id }) =>
			prismaTransaction.productStock.update({
				where: { id },
				data: {
					qtyStock: {
						decrement: mapProductOrdered[id],
					},
				},
			})
		)

		await Promise.all(updateProductsInStock)

		return await prismaTransaction.order
			.update({
				where: { id: order.id },
				data: {
					status: 'confirmed',
					orderPrice,
				},
				include: {
					stock: true,
					owner: true,
					productsOrdered: true,
				},
			})
			.catch((e) => {
				console.log(e)
				throw Error('Could not initialize order.')
			})
	})
}
