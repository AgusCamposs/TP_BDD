import { createFileRoute } from "@tanstack/react-router"
import EditReview from "../pages/EditReview"

export const Route = createFileRoute("/reviews/$id/edit")({
	component: EditReview,
})
