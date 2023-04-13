import { Prisma } from '@prisma/client'
import { userDto } from './user.dto'

export const createUserValidator = (data: userDto) => {
	return Prisma.validator<Prisma.userCreateInput>()({
		...data,
	})
}
