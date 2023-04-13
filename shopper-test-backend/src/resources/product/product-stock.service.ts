import { Prisma } from '@prisma/client'
import prisma from '../../config/db/prisma'
import { HttpException } from '../../util/util.module'
import { enumStatusCode } from '../../util/util.module'

export enum ProductServiceErrorMessage {
	PRODUCT_NOT_FOUND = 'Product not found.',
	PRODUCTS_NOT_FOUND = 'No product found.',
}

export const createProduct = async (productCreateArgs: Prisma.productStockCreateArgs) => {
	//validation
	return await prisma.productStock.create(productCreateArgs)
}

export const findProduct = async (findArgs: Prisma.productStockFindFirstArgs) => {
	const product = await prisma.productStock.findFirst(findArgs)
	if (!product)
		throw new HttpException(
			enumStatusCode.BAD_REQUEST,
			ProductServiceErrorMessage.PRODUCT_NOT_FOUND
		)
	return product
}

export const findProductById = async (id: string) => {
	const product = await prisma.productStock.findUnique({
		where: { id },
	})
	if (!product)
		throw new HttpException(
			enumStatusCode.BAD_REQUEST,
			ProductServiceErrorMessage.PRODUCT_NOT_FOUND
		)
	return product
}

export const findAllProducts = async (findManyArgs: Prisma.productStockFindManyArgs) => {
	return await prisma.productStock.findMany(findManyArgs)
}

export const updateProductById = async (
	id: string,
	data: Prisma.productStockUpdateInput
) => {
	await findProduct({ where: { id } })
	return await prisma.productStock.update({ where: { id }, data })
}
