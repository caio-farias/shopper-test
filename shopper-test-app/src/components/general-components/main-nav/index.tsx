import React from 'react'
import { Link } from 'react-router-dom'
import { environment } from '../../../environment/environment'
import './index.scss'

const MainNav = () => {
	const appName = environment.appName
	return (
		<div>
			<nav className="main-nav">
				<Link to="/">{appName}</Link>
				<Link to="/history">Histórico de pedidos</Link>
			</nav>
		</div>
	)
}

export default MainNav
