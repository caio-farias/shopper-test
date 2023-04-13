import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Routes as Switch,
	Navigate,
} from 'react-router-dom'
import { MainNav } from './components/components.module'
import { HomePage, OrderFinalizedPage, OrderHistoryPage } from './pages/pages.module'
import ShoppingCartProvider from './context/shopping-cart.context'

const Routes = () => {
	return (
		<ShoppingCartProvider>
			<Router>
				<MainNav />
				<Switch>
					<Route
						path="/"
						Component={() => (
							<>
								<Navigate to="/home" />
							</>
						)}
					/>
					<Route path="/home" Component={HomePage}></Route>
					<Route path="/order-finalized" Component={OrderFinalizedPage}></Route>
					<Route path="/history" Component={OrderHistoryPage}></Route>
				</Switch>
			</Router>
		</ShoppingCartProvider>
	)
}

export default Routes
