import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

interface Args
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	modifier?: string
}

const Button = ({
	modifier = 'common',
	disabled = false,
	type = 'button',
	children,
	...props
}: Args) => (
	<button
		disabled={disabled}
		className={`button button--${modifier}`}
		type={type}
		{...props}
	>
		{children}
	</button>
)

const ReturnButton = ({ path, ...props }: { path: string; [x: string]: any }) => {
	const navigate = useNavigate()
	return (
		<button
			className=" button button--return-button"
			onClick={() => navigate(path)}
			{...props}
		/>
	)
}

export default Button
export { ReturnButton }
