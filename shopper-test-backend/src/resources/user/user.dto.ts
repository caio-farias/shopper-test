export interface userDto {
	name: string
	email: string
	cpfCnpj?: string
	birthDate?: Date
	address?: {
		street: string
		state: string
		city: string
		zip: string
	}
}
