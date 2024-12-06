import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { createRoot } from "react-dom/client"
import { StrictMode } from "react"

// Set up a Router instance
const router = createRouter({
	routeTree,
	defaultPreload: "intent",
})

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

createRoot(document.getElementById("app")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
