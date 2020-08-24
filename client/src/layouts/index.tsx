import React from "react"
import Navbar from '../components/navbar'
import { Container } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

type LayoutProps = {
	children: JSX.Element[] | JSX.Element
}

const useStyles = makeStyles((theme: Theme) =>
 createStyles({
	 container: {
	 	paddingTop: theme.spacing(1),
	 	paddingBottom: theme.spacing(1),
	 }
 })
)

export default function DefaultLayout({children}: LayoutProps) {
	const classes = useStyles()
	return (
		<>
			<Navbar/>
			<Container maxWidth="lg" className={classes.container}>
				{children}
			</Container>
		</>
	)
}