import React, { useEffect, useState } from 'react'
import placeholderSrc from '../../../assets/images/product-placeholder.jpg'
import defaultSrc from '../../../assets/images/product-default.png'

const AsyncImage = (
	props: React.DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>
) => {
	const [loadedSrc, setLoadedSrc] = useState<string | undefined>(undefined)
	useEffect(() => {
		setLoadedSrc(placeholderSrc)
		if (props.src) {
			const handleLoad = () => {
				setLoadedSrc(props.src)
			}
			const image = new Image()
			image.addEventListener('load', handleLoad)
			image.src = defaultSrc
			return () => {
				image.removeEventListener('load', handleLoad)
			}
		}
	}, [props.src])
	return <img {...props} alt="product" />
}

const BackgroundImage = ({ src }: { src: string }) => {
	return (
		<div>
			<AsyncImage src={defaultSrc} alt="product" />
		</div>
	)
}

export default BackgroundImage
