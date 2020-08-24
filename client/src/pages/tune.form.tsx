import React, { FunctionComponent } from 'react'
import { useForm } from 'react-hook-form'
import { TextField } from '@material-ui/core'
import Navbar from '../components/navbar'
import Container from '@material-ui/core/Container'
import { FieldErrors } from 'react-hook-form/dist/types/form'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import DefaultLayout from '../layouts'
export const FormContext = React.createContext<Partial<FormContext>>({})

type FormContext = {
	errors: FieldErrors
	register: any
}

type Inputs = {
	name: string
	composer: string
	type: string
	key: string
	abc: string
}



export default function TuneForm() {
	const { register, handleSubmit, watch, errors } = useForm<Inputs>()
	const context: FormContext = { errors, register }
	const onSubmit = (data: Inputs) => console.log(data)
	console.log(watch('Add a tune'))
	return (
		<>
			<DefaultLayout>
				<Container maxWidth="sm">
					<FormContext.Provider value={context}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<FormField label="Name" name="name" component={TextField} required/>
								</Grid>
								<Grid item xs={6}>
									<FormField label="Composer" name="composer" component={TextField} required/>
								</Grid>
								<Grid item xs={6}>
									<FormField label="Key" name="key" component={TextField} required/>
								</Grid>
								<Grid item xs={6}>
									<FormField label="ABC" name="abc" component={TextField} required/>
								</Grid>
							</Grid>
						</form>
					</FormContext.Provider>
				</Container>
			</DefaultLayout>
		</>
	)
}

type FieldWrapperProps = {
	label: string
	name: string
	component: React.FunctionComponent | React.ComponentClass
	required: boolean
	errorText?: string
}

type FieldProps = {
	error: boolean
	id: string
	name: string
	inputProps?: object
	label: string
	helperText?: string
}

const FormField: FunctionComponent<FieldWrapperProps> = ({
																													 label,
																													 name,
																													 component,
																													 required,
																													 errorText,
																												 }) => {
	return (
		<FormContext.Consumer>
			{({ errors, register }) => {
				const props: FieldProps = {
					name,
					id: name,
					error: errors && errors[name],
					label,
					inputProps: required ? { ref: register({ required: true }) } : undefined,
					helperText: errorText,
				}
				return React.createElement<Partial<FieldProps>>(component, props)
			}}
		</FormContext.Consumer>
	)
}
