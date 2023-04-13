import React, { ChangeEvent, useEffect, useState } from 'react'
import './index.scss'
import HomeBody from './components/home-body/home-body.component'
import { ShoppingCart, TextInput } from '../../components/components.module'
import { getProducts } from '../../sevices/product.service'
import { Page } from '../../types/payload'
import { Product } from '../../types/product'

const HomePage = () => {
	const [productsPage, setProductsPage] = useState({
		size: 0,
		data: [],
	} as Page<Product>)
	const [loading, setLoading] = useState(false)
	const [productName, setProductName] = useState('')

	useEffect(() => {
		setLoading(true)
		const getData = setTimeout(() => {
			getProducts({ size: 50, name: productName }).then((res) => {
				const { data, size } = res.data
				setProductsPage({ data, size })
				setLoading(false)
			})
		}, 1000)
		return () => clearTimeout(getData)
	}, [productName])

	const handleProductNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setProductName(e.target.value)
	}

	return (
		<section className="home-page">
			<ShoppingCart />
			<div className="home-page-search-bar-wrapper">
				<TextInput
					value={productName}
					onChange={handleProductNameChange}
					name="search-product-input"
					placeholder="O que você procura?"
				/>
			</div>
			<HomeBody loading={loading} productsPage={productsPage} />
		</section>
	)
}

export default HomePage
