import { useState, useCallback, PropsWithChildren, createContext } from 'react'
import { ProductOrdered } from '../types/product'

interface ShoppingCartContextType {
	total: number
	productsOrdered: ProductOrdered[]
	addProductToCart: (product: ProductOrdered) => void
	removeProductFromCart: (productID: string) => void
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextType)

interface ShoppingContextData {
	productsOrdered: ProductOrdered[]
	total: number
}

const ShoppingCartProvider = ({ children }: PropsWithChildren) => {
	const [shoppingCart, setShoppingCart] = useState({
		total: 0,
		productsOrdered: [],
	} as ShoppingContextData)

	const addProductToCart = useCallback(
		(newProduct: ProductOrdered) => {
			const idx = shoppingCart.productsOrdered.findIndex(({ id }) => id === newProduct.id)

			if (idx < 0) {
				setShoppingCart((state) => ({
					...state,
					productsOrdered: [...state.productsOrdered, { ...newProduct, qty: 1 }],
				}))
			} else {
				const updatedProduct = {
					...shoppingCart.productsOrdered[idx],
				}
				updatedProduct.qty += 1
				shoppingCart.productsOrdered[idx] = updatedProduct
			}

			const { price } = newProduct
			setShoppingCart((state) => ({ ...state, total: +(state.total + price).toFixed(2) }))
		},
		[shoppingCart]
	)

	const removeProductFromCart = useCallback(
		(productId: string) => {
			const product = shoppingCart.productsOrdered.find(({ id }) => id === productId)

			if (!product)
				return console.log(
					`Product with id ${productId} not found..`,
					shoppingCart.productsOrdered
				)

			const { qty, price } = product

			if (qty > 1) {
				const idx = shoppingCart.productsOrdered.findIndex(({ id }) => id === productId)
				const updatedProduct = {
					...shoppingCart.productsOrdered[idx],
				}
				updatedProduct.qty -= 1
				shoppingCart.productsOrdered[idx] = updatedProduct
			} else {
				setShoppingCart((state) => ({
					...state,
					productsOrdered: [
						...state.productsOrdered.filter(({ id }) => id !== product.id),
					],
				}))
			}

			setShoppingCart((state) => ({ ...state, total: +(state.total - price).toFixed(2) }))
		},
		[shoppingCart]
	)

	return (
		<ShoppingCartContext.Provider
			value={{
				total: shoppingCart.total,
				productsOrdered: shoppingCart.productsOrdered,
				addProductToCart,
				removeProductFromCart,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	)
}

export default ShoppingCartProvider
