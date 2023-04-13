import { ReactNode } from 'react'
import { Button } from '../../components.module'
import './index.scss'

interface ModalArgs {
	title: string
	showModal: boolean
	children: ReactNode
	path: string
	buttonMessage: string
	[x: string]: any
}

interface ModalContentArgs {
	title: string
	children: ReactNode
	path: string
	buttonMessage: string
	[x: string]: any
}

interface ConfirmModalArgs {
	children: ReactNode
	showModal: boolean
	loading?: boolean
	leftButtonMessage: string
	rightButtonMessage?: string
	leftButtonFunction: () => void
	rightButtonFunction?: () => void
}

const Modal = ({
	showModal,
	title,
	children,
	path = '/login',
	buttonMessage = 'Voltar para o login',
	onClick,
	...rest
}: ModalArgs) =>
	showModal ? (
		<div className="modal--on">
			<ModalContent title={title} buttonMessage={buttonMessage} path={path} {...rest}>
				{children}
			</ModalContent>
		</div>
	) : (
		<></>
	)

const ModalContent = ({
	title,
	children,
	path,
	buttonMessage,
	onClick,
	...rest
}: ModalContentArgs) => {
	return (
		<div className="modal-wrapper">
			<h1 className="modal__title">{title}</h1>
			{children}
			<Button onClick={onClick} {...rest}>
				{buttonMessage}
			</Button>
		</div>
	)
}

const ConfirmModal = ({
	showModal,
	children,
	loading = false,
	leftButtonMessage = 'Sim',
	rightButtonMessage,
	leftButtonFunction,
	rightButtonFunction,
}: ConfirmModalArgs) =>
	showModal ? (
		<div className="confirm-modal--on">
			<div className="confirm-modal-wrapper">
				{children}
				<div className="confirm-modal-button-wrapper">
					{!loading && (
						<>
							<Button modifier="common-red" onClick={leftButtonFunction}>
								{leftButtonMessage}
							</Button>
							{rightButtonMessage && (
								<Button onClick={rightButtonFunction}>{rightButtonMessage}</Button>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	) : (
		<></>
	)

export default Modal
export { ConfirmModal }
