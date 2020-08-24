import React, { Attributes, ComponentClass, FunctionComponent } from 'react'
import { useForm } from 'react-hook-form'
import { TextField } from '@material-ui/core'
import Navbar from '../components/navbar'
import Container from '@material-ui/core/Container'
import { FieldErrors } from 'react-hook-form/dist/types/form'

export const FormContext = React.createContext<Partial<FormContext>>({})

type FormContext = {
	errors: FieldErrors
}

type Inputs = {
	name: string
	composer: string
	type: string
	key: string
	abc: string
}

export const TuneForm: FunctionComponent = () => {
	const { register, handleSubmit, watch, errors } = useForm<Inputs>()
	const context: FormContext = { errors }
	const onSubmit = (data: Inputs) => console.log(data)
	console.log(watch('Add a tune'))
	return (
		<>
			<Navbar />
			<Container>
				<FormContext.Provider value={context}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							name="name"
							label="Name"
							error={!errors.name === undefined}
							inputProps={{ ref: register({ required: true }) }}
						/>
						<TextField
							name="composer"
							label="Composer"
							error={!errors.composer === undefined}
							inputProps={{ ref: register({ required: true }) }}
						/>
						<TextField
							name="type"
							label="Type"
							error={!errors.type === undefined}
							inputProps={{ ref: register({ required: true }) }}
						/>
						<TextField
							name="key"
							label="Key"
							error={!errors.name === undefined}
							inputProps={{ ref: register({ required: true }) }}
						/>
						<TextField
							name="abc"
							label="abc"
							error={!errors.name === undefined}
							inputProps={{ ref: register({ required: true }) }}
						/>
					</form>
				</FormContext.Provider>
			</Container>
		</>
	)
}

type FieldWrapperProps = {
	label: string
	id: string
	component: React.FunctionComponent | React.ComponentClass
	required: boolean
}

type FieldProps = {
	error: boolean
	id: string
	name: string
	inputProps: object
	label: Node
}

const FieldWrapper: FunctionComponent<FieldWrapperProps> = ({
	label,
	id,
	component,
}) => {
	return (
		<FormContext.Consumer>
			{({ errors }) => {
				return React.createElement(component )
			}}
		</FormContext.Consumer>
	)
}
