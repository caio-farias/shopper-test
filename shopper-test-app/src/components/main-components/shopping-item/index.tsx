import { Button } from '../../components.module'
import BackgroundImage from '../../general-components/image'
import './index.scss'

interface Args {
	title: string
	imageSrc: string
	price: number
	qty: number
	addProductToCart: () => void
	removeProductFromCart: () => void
}

export const ShoppingItem = ({
	title,
	imageSrc,
	price,
	qty,
	addProductToCart,
	removeProductFromCart,
}: Args) => {
	return (
		<div className="shopping-item">
			<div className="shopping-item-wrapper">
				<div className="shopping-item-wrapper__img">
					<BackgroundImage src={imageSrc} />
				</div>
				<div className="shopping-item-wrapper__content">
					<span>{title}</span>
					<span>R$ {price}</span>
				</div>
				<div className="shopping-item-wrapper__actions">
					<Button modifier="tiny" onClickCapture={removeProductFromCart}>
						-
					</Button>
					<span>{qty}</span>
					<Button modifier="tiny" onClickCapture={addProductToCart}>
						+
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ShoppingItem
