import { useNavigate, useParams } from "@tanstack/react-router"
import Review from "./Review"

const EditReview = () => {
	const id = useParams({ from: "/reviews/$id/edit", select: (params) => params.id }) // ID de la reseña (en caso de editar)
	const url = id ? `http://localhost:8081/reviews/${id}` : undefined
	const navigate = useNavigate()

	if (!id) navigate({ to: "/" })
	return <Review url={url} />
}

export default EditReview
