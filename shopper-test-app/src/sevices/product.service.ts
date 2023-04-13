import { ResponsePaginated } from '../types/payload'
import { Product } from '../types/product'
import api from './api'

interface RequestOption {
	page?: number
	size?: number
	name?: string
}

export const getProducts = async ({ page = 0, size = 10, name }: RequestOption) =>
	(await api.get('/product', {
		params: { page, size, name },
	})) as ResponsePaginated<Product>
