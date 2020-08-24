import React from 'react'
import Navbar from '../components/navbar'
import { Container } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

export default function Home() {
	return (
		<>
			<Navbar />
			<Container maxWidth="lg">
				<Typography>Personal tunebook</Typography>
			</Container>
		</>
	)
}
