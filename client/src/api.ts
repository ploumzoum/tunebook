import axios from 'axios'
import {Inputs} from "./pages/tune.form"
const client = axios.create({
	baseURL: 'http://127.0.0.1:3002'
})

export async function createTune(data: Inputs) {
	return await client.post('/tunes', data)
}