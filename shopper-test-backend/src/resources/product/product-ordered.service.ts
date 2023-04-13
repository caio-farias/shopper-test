import { Prisma, PrismaClient } from '@prisma/client'
import prisma from '../../config/db/prisma'

export enum ProductServiceErrorMessage {
	PRODUCT_NOT_FOUND = 'Product not found.',
	PRODUCTS_NOT_FOUND = 'No product found.',
}

export const createProduct = async (
	productCreateArgs: Prisma.productOrderedCreateArgs
) => {
	//validation
	return await prisma.productOrdered.create(productCreateArgs)
}

export const createManyProductsTransaction = async (
	products: Prisma.productOrderedCreateManyInput[]
) => {
	//validation
	return await prisma.$transaction(
		products.map((p) => prisma.productOrdered.create({ data: p }))
	)
}

export const findProduct = async (findArgs: Prisma.productOrderedFindFirstArgs) => {
	const product = await prisma.productOrdered.findFirst(findArgs)
	if (!product) throw new Error(ProductServiceErrorMessage.PRODUCT_NOT_FOUND)
	return product
}

export const findProductById = async (id: string) => {
	const product = await prisma.productOrdered.findUnique({
		where: { id },
	})
	if (!product) throw new Error(ProductServiceErrorMessage.PRODUCT_NOT_FOUND)
	return product
}

export const findAllProducts = async (
	findManyArgs: Prisma.productOrderedFindManyArgs
) => {
	return await prisma.productOrdered.findMany(findManyArgs)
}
