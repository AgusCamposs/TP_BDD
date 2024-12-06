import { useNavigate } from "@tanstack/react-router"
import axios from "axios"
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react"
import { Review } from "../types/review"

export const useReview = (url: string | undefined) => {
	const navigate = useNavigate()
	const [reviewData, setReviewData] = useState<Review>({
		id:"",
        movie: "",
		reviewerName: "",
		review: "",
		rating: 0,
	})

	// Carga la reseña actual si está en modo edición
	useEffect(() => {
		if (url) {
			axios
				.get(url)
				.then((response) => setReviewData(response.data))
				.catch((error) => console.error("Error fetching review:", error))
		}
	}, [url])

	const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
		e
	) => {
		const { name, value } = e.target
		setReviewData((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		const fetchUrl = url ?? "http://localhost:8081/reviews/create"

		const method = url ? "patch" : "post"

		axios[method](fetchUrl, reviewData)
			.then(() => {
				alert(url ? "Review updated successfully!" : "Review added successfully!")
				navigate({ to: "/movies"})
			})
			.catch((error) => console.error("Error saving review:", error))
	}

	const handleDelete = () => {
		axios
			.delete(`http://localhost:8081/reviews/delete/${reviewData.id}`)
			.then(() => {
				alert("Review deleted successfully!")
				navigate({ to: "/movies"}) // Redirige a los detalles de la película
			})
			.catch((error) => console.error("Error deleting review:", error))
	}

	return { reviewData, handleChange, handleSubmit, handleDelete }
}
