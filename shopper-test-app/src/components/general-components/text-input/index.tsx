import React from 'react'
import './index.scss'

interface TextInputCreate
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	modifier?: string
	label?: string
	name: string
	type?: string
	error?: string
	icon?: string
	[x: string]: any
}

const TextInput = ({
	modifier = 'common',
	label,
	name,
	type = 'text',
	error,
	icon = '',
	...rest
}: TextInputCreate) => (
	<div className={`text-input-wrapper text-input-wrapper--${modifier}`}>
		<label className={`text-input-label--${modifier}`} htmlFor={name}>
			{label}
		</label>
		<input className={`text-input--${modifier}`} name={name} type={type} {...rest} />
		<div className={`text-input__icon--${icon}`} />
		{error && (
			<span className={`text-input-error--${modifier}`}>
				<svg
					aria-hidden="true"
					className="stUf5b qpSchb"
					fill="currentColor"
					focusable="false"
					width="18px"
					height="18px"
					viewBox="0 1 28 28"
					xmlns="https://www.w3.org/2000/svg"
				>
					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
				</svg>
				{error}
			</span>
		)}
	</div>
)

export default TextInput
