export interface Product {
	id: string
	createdAt: Date
	updatedAt: Date
	name: string
	price: number
	qtyStock: number
	category?: string
	brand?: string
	stock: any
	stockId: string
	productsOrdered: any[]
}

export interface ProductOrdered extends Product {
	qty: number
}
