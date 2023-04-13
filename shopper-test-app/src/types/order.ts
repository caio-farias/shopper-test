import { Product, ProductOrdered } from './product'
import { User } from './user'

export interface Address {
	street: string
	city: string
	state: string
	zip: string
}

export interface Stock {
	id: string
	createdAt: Date
	updatedAt: Date
	name: string
	category?: string
	location: Address
	products?: Product[]
	orders?: Order[]
}

export interface Order {
	id: string
	ownerId: string
	owner: User
	stockId: string
	stock: Stock
	status: string
	orderPrice: number
	deliveryDate: Date
	productsOrdered: ProductOrdered[]
}
