import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCartContext } from '../../../context/shopping-cart.context'
import { Button, ShoppingItem } from '../../components.module'
import './index.scss'

interface Args {
	modifier?: string
}

const ShoppingCart = ({ modifier = 'fixed' }: Args) => {
	const { productsOrdered, total, addProductToCart, removeProductFromCart } =
		useContext(ShoppingCartContext)
	const [showCart, setShowCart] = useState(true)
	const navigate = useNavigate()

	const toggleShoppingCart = () => {
		setShowCart((state) => !state)
	}

	return (
		<div className={`shopping-cart shopping-cart--${modifier}`}>
			<div className="shopping-cart-header">
				<span>Lista de compras</span>
				<Button onClickCapture={toggleShoppingCart}>{showCart ? 'x' : 'v'}</Button>
			</div>
			<div className={`shopping-cart-wrapper${showCart ? '' : '--hide'}`}>
				{productsOrdered.map((p) => (
					<ShoppingItem
						key={p.name}
						title={p.name}
						imageSrc={''}
						price={p.price}
						qty={p.qty}
						addProductToCart={() => addProductToCart(p)}
						removeProductFromCart={() => removeProductFromCart(p.id)}
					/>
				))}
			</div>
			<div className="shopping-cart-footer">
				<span>Total: R$ {total > 0 ? total : `0.00`}</span>
				<Button onClickCapture={() => navigate('/order-finalized')}>Finalizar</Button>
			</div>
		</div>
	)
}

export default ShoppingCart
