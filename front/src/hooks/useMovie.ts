import { useNavigate } from "@tanstack/react-router"
import axios from "axios"
import { useState, ChangeEventHandler, FormEventHandler } from "react"
import { Movie } from "../types/movie"

const isDisabled = (movie: Movie) =>
	!movie.title ||
	!movie.genre ||
	!movie.year ||
	!movie.director ||
	!movie.rating ||
	!movie.actors.length ||
	movie.actors.some((actor) => !actor.name || !actor.lastname || !actor.age)

export const useMovie = () => {
	const [movie, setMovie] = useState<Movie>({
		title: "",
		genre: "",
		year: "",
		director: "",
		rating: "",
		actors: [],
	})

	const navigate = useNavigate()

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const { name, value } = e.target
		setMovie((prev) => ({ ...prev, [name]: value }))
	}

	const handleActorChange = (
		index: number,
		field: "name" | "lastname" | "age",
		value: string
	) => {
		const updatedActors = [...movie.actors]
		updatedActors[index][field] = value
		setMovie((prev) => ({ ...prev, actors: updatedActors }))
	}

	const addActor = () => {
		setMovie((prev) => ({
			...prev,
			actors: [...prev.actors, { name: "", lastname: "", age: "" }],
		}))
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		axios
			.post("http://localhost:8081/movies/create", movie)
			.then(() => navigate({ to: "/movies" }))
			.catch((error) => console.error("Error saving movie:", error))
	}

	return { movie, handleChange, handleActorChange, addActor, handleSubmit, isDisabled }
}
