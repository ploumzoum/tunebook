import { makeAutoObservable, autorun, runInAction } from "mobx"
import uuid from "node-uuid"


export class TuneStore {
	todos = Tune[]
	isLoading = true

	constructor(transportLayer) {
		makeAutoObservable(this)

		this.transportLayer.onReceiveTodoUpdate(updatedTodo =>
			this.updateTodoFromServer(updatedTodo)
			)
		this.loadTunes()
	}

    // Fetches all Tunes from the server.
    loadTodos() {
    	this.isLoading = true
    	this.transportLayer.fetchTodos().then(fetchedTodos => {
    		fetchedTodos.forEach(json => this.updateTodoFromServer(json))
    		runInAction(() => {
    			this.isLoading = false
    		})
    	})
    }

    // Update a Tune with information from the server. Guarantees a Tune only
    // exists once. Might either construct a new Tune, update an existing one,
    // or remove a Tune if it has been deleted on the server.
    updateTune(json) {
    	const todo = this.todos.find(todo => todo.id === json.id)
    	if (!todo) {
    		todo = new Todo(this, json.id)
    		this.todos.push(todo)
    	}
    	if (json.isDeleted) {
    		this.removeTodo(todo)
    	} else {
    		todo.updateFromJson(json)
    	}
    }

    // Creates a fresh Todo on the client and the server.
    createTodo() {
    	const todo = new Todo(this)
    	this.todos.push(todo)
    	return todo
    }

    // A Todo was somehow deleted, clean it from the client memory.
    removeTodo(todo) {
    	this.todos.splice(this.todos.indexOf(todo), 1)
    	todo.dispose()
    }
}

// Domain object Tune.
