import { useNavigate, useParams } from "@tanstack/react-router"
import axios from "axios"
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react"

const EditMove = () => {
	const [movie, setMovie] = useState({
		rating: "",
	})
	const id = useParams({ from: "/movies_/$id/edit", select: (params) => params.id }) // Para obtener el ID de la película
	const navigate = useNavigate()

	// Cargar los datos de la película a editar
	useEffect(() => {
		axios
			.get(`http://localhost:8081/movies/${id}`)
			.then((response) => setMovie(response.data))
			.catch((error) => console.error("Error fetching movie:", error))
	}, [id])

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const { name, value } = e.target
		setMovie((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		axios
			.patch(`http://localhost:8081/movies/updateRating/${id}`, movie)
			.then(() => navigate({ to: "/movies" }))
			.catch((error) => console.error("Error updating movie:", error))
	}

	return (
		<main>
			<h1>Edit Movie Rating</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Rating:</label>
					<input
						type="number"
						name="rating"
						value={movie.rating}
						onChange={handleChange}
						min="0"
						max="5"
						required
					/>
				</div>
				<button type="submit">Save</button>
			</form>
		</main>
	)
}

export default EditMove
