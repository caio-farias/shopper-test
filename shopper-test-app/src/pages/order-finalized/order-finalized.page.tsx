import { useContext, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button, ShoppingItem, Spinner } from '../../components/components.module'
import { ShoppingCartContext } from '../../context/shopping-cart.context'
import { Formik, Form } from 'formik'
import { CreateOrderPayload, createOrder } from '../../sevices/order.service'
import { ConfirmModal } from '../../components/general-components/modal'
import { useNavigate } from 'react-router-dom'
import { FormTextInput } from '../../components/general-components/general-components.module'

import './index.scss'

export const OrderFinalizedPage = () => {
	const navigate = useNavigate()
	const { productsOrdered, total, addProductToCart, removeProductFromCart } =
		useContext(ShoppingCartContext)
	const [successMessage, setSuccessMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [deliveryDate, setDeliveryDate] = useState(new Date())

	const userOrder = {
		stockId: '64317a682adb3c5c5aa4d26e',
		userName: '',
		userEmail: '',
		deliveryDate: deliveryDate,
		productsToBeOrdered: productsOrdered.map(({ id, qty }) => ({ id, qty })),
	}

	const handleOnDateChange = (date: Date) => {
		setDeliveryDate(date)
	}

	const handleSubmit = async (values: CreateOrderPayload) => {
		setLoading(true)
		try {
			await createOrder({
				...values,
				deliveryDate: deliveryDate,
				productsToBeOrdered: productsOrdered.map(({ id, qty }) => ({ id, qty })),
			})
		} catch (error: any) {
			const message = error.response.data.message
			setLoading(false)
			setErrorMessage(`Erro ao processar pedido. ${message}`)
			return
		}

		setLoading(false)
		setSuccessMessage('Pedido feito com sucesso.')
		return
	}

	return (
		<section className="order-finalized">
			<h1>Confirmação de pedido</h1>
			<Formik onSubmit={handleSubmit} initialValues={userOrder}>
				{({ values }) => (
					<Form className="order-finalized-form">
						<div className="order-finalized-form-shopping-cart">
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
						<div>
							<FormTextInput label="Nome do usuário" name="userName" />
						</div>
						<div>
							<FormTextInput label="E-mail" name="userEmail" />
						</div>
						<div>
							<label>Data de entrega desejada</label>
							<DatePicker
								name="deliveryDate"
								selected={deliveryDate}
								onChange={handleOnDateChange}
							/>
						</div>
						<div className="order-finalized-form-submit">
							<span>Total: R$ {total}</span>
							<Button type="submit">Enviar pedido</Button>
						</div>
					</Form>
				)}
			</Formik>

			<ConfirmModal
				showModal={loading || !!successMessage || !!errorMessage}
				loading={loading}
				leftButtonMessage={'Voltar'}
				leftButtonFunction={() => {
					if (!!errorMessage) {
						setErrorMessage('')
						setLoading(false)
						return
					}
					navigate('/home')
				}}
				rightButtonMessage={!!errorMessage ? undefined : 'Ver pedido'}
				rightButtonFunction={!!errorMessage ? undefined : () => navigate('/history')}
			>
				{!loading && (
					<>
						<h1 className="confirm-modal__title">
							{!!successMessage
								? 'Pedido realizado com sucesso'
								: 'Falha ao realizar pedido'}
						</h1>
						<p className="confirm-modal__description">
							{!!successMessage ? successMessage : errorMessage}
						</p>
					</>
				)}
				{loading && <Spinner />}
			</ConfirmModal>
		</section>
	)
}
