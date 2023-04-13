import { Page } from '../../../../types/payload'
import { Spinner } from '../../../../components/components.module'
import ProductPanel from './product-panel.component'
import { Product } from '../../../../types/product'

interface Args {
	productsPage: Page<Product>
	loading?: boolean
}

const HomeBody = ({ productsPage, loading }: Args) => {
	const { size } = productsPage
	return (
		<section className="home-body">
			<div className="home-body-header">
				<span>{size && !loading ? `${size} encontrados` : 'Carregando..'} </span>
			</div>
			{!loading ? (
				<>
					<ProductPanel productsPage={productsPage} />
				</>
			) : (
				<Spinner />
			)}
			<div className="home-body-footer"></div>
		</section>
	)
}

export default HomeBody
