import React, { ReactNode } from 'react'
import { Button } from '../../components.module'
import BackgroundImage from '../../general-components/image'
import './index.scss'

interface Args
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: string
	disabled?: boolean
	prefix?: string
	description?: string
	imgPath: string
	onCardClick?: () => void
	onClick?: () => void
	children: ReactNode
}

export const Card = ({
	title,
	imgPath,
	prefix,
	disabled,
	description,
	onClick,
	onCardClick,
	children,
}: Args) => {
	return (
		<div className="card">
			<div className="card-wrapper" onClickCapture={onCardClick}>
				<div className="card-wrapper-image">
					<BackgroundImage src={''} />
				</div>
				<div className="card-wrapper-content">
					<span className="card-wrapper-content__title"> {title}</span>
					<div className="card-wrapper-content-description-wrapper">
						<span className="card-wrapper-content-description-wrapper__description">
							<span className="card-wrapper-content-description-wrapper__prefix">
								{prefix}
							</span>
							{description}
						</span>
						{children}
					</div>
				</div>
				<div className="card-wrapper-action">
					<Button disabled={disabled} onClickCapture={onClick}>
						Adicionar
					</Button>
				</div>
			</div>
		</div>
	)
}
