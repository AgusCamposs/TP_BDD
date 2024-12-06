export interface Actor {
	name: string
	lastname: string
	age: string
}

export interface Movie {
	id: string
	title: string
	genre: string
	year: string
	director: string
	rating: string
	actors: Actor[]
}
