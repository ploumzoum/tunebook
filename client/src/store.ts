import { action, observable, reaction } from 'mobx'
import { v4 as uuidv4 } from "uuid"
export interface Tune {
	_id?: string
	title: string
	type: string
	abc: string
	key: string
	composer: string
	note: string
	createdAt: Date
	updatedAt: Date
}

class TuneStore {
	constructor() {
		reaction(() => this.tunes, _ => console.log(this.tunes.length))
	}

	@observable tunes: Tune[] = []
	@action addTune = (tune: Tune) => {
		this.tunes.push({ ...tune, _id: uuidv4()})
	}
}