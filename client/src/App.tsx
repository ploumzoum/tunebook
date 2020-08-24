import React from 'react'
import 'fontsource-roboto'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/home'
import TuneForm from './pages/tune.form'
export default function App() {
	return (
		<Router>
			<div>
				<CssBaseline />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/new-tune" exact component={TuneForm} />
				</Switch>
			</div>
		</Router>
	)
}
