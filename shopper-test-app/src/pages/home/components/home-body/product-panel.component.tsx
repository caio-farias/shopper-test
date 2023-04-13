import { useContext } from 'react'
import { Page } from '../../../../types/payload'
import { Card } from '../../../../components/components.module'
import { ShoppingCartContext } from '../../../../context/shopping-cart.context'
import { Product, ProductOrdered } from '../../../../types/product'

interface Args {
	productsPage: Page<Product>
}

const ProductPanel = ({ productsPage }: Args) => {
	const { data } = productsPage
	const { addProductToCart } = useContext(ShoppingCartContext)

	return (
		<div className="product-panel">
			{data &&
				data.map((p) => (
					<Card
						key={p.name}
						title={p.name}
						imgPath={''}
						prefix="R$ "
						description={p.price.toString()}
						disabled={p.qtyStock < 1}
						onClick={() => addProductToCart(p as ProductOrdered)}
					>
						<span
							className={`card__aditional-info ${
								p.qtyStock >= 1 ? '' : 'card__aditional-info--outOfStock'
							}`}
						>
							{p.qtyStock >= 1 ? `em estoque: ${p.qtyStock}` : 'fora de estoque'}
						</span>
					</Card>
				))}
		</div>
	)
}

export default ProductPanel
