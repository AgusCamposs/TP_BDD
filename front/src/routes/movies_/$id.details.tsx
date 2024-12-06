import { createFileRoute } from '@tanstack/react-router'
import DetailsMovie from '../../pages/Details'

export const Route = createFileRoute('/movies_/$id/details')({
  component: DetailsMovie,
})
