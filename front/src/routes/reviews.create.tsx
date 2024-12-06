import { createFileRoute } from "@tanstack/react-router"
import Review from "../pages/Review"

export const Route = createFileRoute("/reviews/create")({
	component: Review,
})
