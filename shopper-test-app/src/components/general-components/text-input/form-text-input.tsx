import React from 'react'
import './index.scss'
import { ErrorMessage, Field } from 'formik'

interface FormTextInputCreate
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

const FormTextInput = ({
	modifier = 'common',
	label,
	name,
	type = 'text',
	error,
	icon = '',
	...rest
}: FormTextInputCreate) => (
	<div className={`text-input-wrapper text-input-wrapper--${modifier}`}>
		<label className={`text-input-label--${modifier}`} htmlFor={name}>
			{label}
		</label>
		<Field className={`text-input--${modifier}`} name={name} type={type} {...rest} />
		<ErrorMessage
			className={`text-input-error--${modifier}`}
			component="span"
			name={name}
		/>
	</div>
)

export default FormTextInput
