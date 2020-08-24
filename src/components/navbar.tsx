import React from 'react'
import { useScrollTrigger } from '@material-ui/core'
import Slide from '@material-ui/core/Slide'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { QueueMusicOutlined } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
			color: 'white',
		},
		title: {
			flexGrow: 1,
		},
		link: {
			marginLeft: 'auto',
		},
	}),
)
export default function Navbar() {
	const trigger = useScrollTrigger()
	const styles = useStyles()
	return (
		<>
			<Toolbar />
			<Slide appear={false} direction="down" in={!trigger}>
				<AppBar>
					<Toolbar>
						<IconButton
							edge="start"
							className={styles.menuButton}
							component={RouterLink}
							to="/"
						>
							<QueueMusicOutlined />
						</IconButton>
						<Typography variant="h6">Personal tunebook</Typography>
						<Button
							component={RouterLink}
							to="/new-tune"
							color="inherit"
							className={styles.link}
						>
							Add a tune
						</Button>
					</Toolbar>
				</AppBar>
			</Slide>
		</>
	)
}
