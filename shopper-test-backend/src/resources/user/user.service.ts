import { Prisma } from '@prisma/client'
import prisma from '../../config/db/prisma'
import { enumStatusCode } from '../../util/error.enum'
import { HttpException } from '../../util/helperHandlers.util'
import { createUserValidator } from './user.validator'
import { userDto } from './user.dto'

export enum UserServiceErrorMessage {
	INVALID_USER_PARAMETERS = 'Invalid parameters.',
	USER_NOT_FOUND = 'User not found.',
	USERS_NOT_FOUND = 'No user found.',
}

export const createUser = async (data: userDto) => {
	return await prisma.user
		.create({
			data: createUserValidator({ ...data }),
		})
		.catch((e: Prisma.PrismaClientKnownRequestError) => {
			// console.error(e)
			throw new HttpException(
				enumStatusCode.UNPROCESSABLE_ENTITY,
				e.name || UserServiceErrorMessage.INVALID_USER_PARAMETERS
			)
		})
}

export const findUser = async (findArgs: Prisma.userFindFirstArgs) => {
	const user = await prisma.user.findFirst(findArgs)
	if (!user) throw new Error(UserServiceErrorMessage.USER_NOT_FOUND)
	return user
}

export const findUserById = async (id: string) => {
	const user = await prisma.user.findUnique({ where: { id }, include: { orders: true } })
	if (!user) throw new Error(UserServiceErrorMessage.USER_NOT_FOUND)
	return user
}

export const findAllUsers = async (findManyArgs: Prisma.userFindManyArgs) => {
	return await prisma.user.findMany(findManyArgs)
}

export const updateUser = async (updateArgs: Prisma.userUpdateArgs) => {
	const { where, select } = updateArgs
	await findUser({ where, select })
	return await prisma.user.update(updateArgs)
}

export const updateUserById = async (id: string, data: Prisma.userCreateInput) => {
	await findUser({ where: { id } })
	return await prisma.user.update({ where: { id }, data })
}
