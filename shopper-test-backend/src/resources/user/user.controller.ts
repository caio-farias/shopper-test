import { Request, Response } from 'express'
import { userService } from './user.module'

export const createUser = async (req: Request, res: Response) => {
	const { body } = req
	return res.json(await userService.createUser(body))
}

export const getUser = async (req: Request, res: Response) => {
	const { query } = req

	return res.json(
		await userService.findUser({ where: { ...query }, include: { orders: true } })
	)
}

export const getAllUsers = async (req: Request, res: Response) => {
	const { query } = req
	return res.json(
		await userService.findAllUsers({ where: { ...query }, include: { orders: true } })
	)
}

export const updateUserById = async (req: Request, res: Response) => {
	const {
		body,
		params: { id },
	} = req

	return res.json(await userService.updateUserById(id, body))
}
