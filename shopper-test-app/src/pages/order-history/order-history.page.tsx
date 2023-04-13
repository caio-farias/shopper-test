import { ChangeEvent, useEffect, useState } from 'react'
import { Order } from '../../types/order'
import { Page } from '../../types/payload'
import { getOrdersByUserName } from '../../sevices/order.service'
import { Button, Spinner, TextInput } from '../../components/components.module'

export const OrderHistoryPage = () => {
	const [ordersPage, setOrdersPage] = useState({
		size: 0,
		data: [],
	} as Page<Order>)
	const [loading, setLoading] = useState(false)
	const [userName, setUserName] = useState('')

	useEffect(() => {
		setLoading(true)
		const getData = setTimeout(() => {
			getOrdersByUserName({ userName: userName }).then((res) => {
				const { data } = res
				setOrdersPage({ data, size: data.length })
				setLoading(false)
			})
		}, 1000)
		return () => clearTimeout(getData)
	}, [userName])

	useEffect(() => {}, [])

	const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setUserName(e.target.value)
	}

	return (
		<section className="order-history-page">
			<div className="order-history-search-bar-wrapper">
				<TextInput
					value={userName}
					onChange={handleUserNameChange}
					name="search-product-input"
					placeholder="Digite o nome do usuário"
				/>
			</div>
			{/* {!loading ? (
				ordersPage.data.map((order) => (
					<span key={order.id}>
						{order.id} - {order.ownerId} - {order.owner.name}
					</span>
				))
			) : (
				<Spinner />
			)} */}
		</section>
	)
}
