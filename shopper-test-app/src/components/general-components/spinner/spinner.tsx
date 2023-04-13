import { CSSProperties } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const Spinner = ({
	loading = true,
	display = 'block',
	margin = '0 auto',
	size = 100,
	borderColor = '#2da77a',
	borderWidth = 3,
	color = '#2da77a',
}) => {
	return (
		<ClipLoader
			color={color}
			loading={loading}
			cssOverride={{ display, margin, borderColor, borderWidth } as CSSProperties}
			size={size}
			speedMultiplier={0.75}
			title="Loading"
			aria-label="Loading Spinner"
			data-testid="loader"
		/>
	)
}

export default Spinner
