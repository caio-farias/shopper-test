import { Response } from 'express'
import { productStockService } from './product.module'
import { ProductRequestContent } from '../../types/types.module'

export const createProduct = async (req: ProductRequestContent, res: Response) => {
	const { data } = req.body

	return res.json(await productStockService.createProduct({ data }))
}

export const getProduct = async (req: ProductRequestContent, res: Response) => {
	const { id } = req.params

	return res.json(await productStockService.findProductById(id))
}

export const getProductById = async (req: ProductRequestContent, res: Response) => {
	const { id } = req.params

	return res.json(await productStockService.findProductById(id))
}

export const getAllProducts = async (req: ProductRequestContent, res: Response) => {
	const {
		offset,
		size,
		name,
		maxQtyStock,
		minQtyStock,
		minPrice,
		maxPrice,
		brand,
		category,
	} = req.query
	const products = await productStockService.findAllProducts({
		where: {
			name: { contains: name.toUpperCase() || undefined },
			qtyStock: { gte: +minQtyStock || undefined, lte: +maxQtyStock || undefined },
			price: { gte: +minPrice || undefined, lte: +maxPrice || undefined },
			brand: { contains: brand || undefined },
			category: { contains: category || undefined },
		},
		skip: +offset || 0,
		take: +size || 20,
		include: {
			productsOrdered: true,
			stock: true,
		},
	})
	return res.json({
		page: offset,
		size: products.length,
		data: products,
	})
}

export const updateProductById = async (req: ProductRequestContent, res: Response) => {
	const {
		body: { data },
		params: { id },
	} = req

	return res.json(await productStockService.updateProductById(id, data))
}
