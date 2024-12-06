import { createFileRoute } from "@tanstack/react-router"
import ListMovie from "../pages/List"

export const Route = createFileRoute("/movies")({
	component: ListMovie,
})
