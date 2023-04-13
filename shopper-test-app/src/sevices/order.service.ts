import { Order } from '../types/order'
import { Response } from '../types/payload'
import api from './api'

export interface CreateOrderPayload {
	stockId: string
	userName: string
	userEmail: string
	deliveryDate: Date
	productsToBeOrdered: {
		id: string
		qty: number
	}[]
}

export interface FilterOrderOptions {
	userName?: string
	page?: number
	size?: number
}

export const createOrder = async (order: CreateOrderPayload) =>
	await api.post('/order', order)

export const getOrders = async () => (await api.get('/order')) as Response<Order[]>

export const getOrdersByUserName = async ({
	page = 0,
	size = 10,
	userName,
}: FilterOrderOptions) =>
	(await api.get('/order', { params: { page, size, userName } })) as Response<Order[]>
