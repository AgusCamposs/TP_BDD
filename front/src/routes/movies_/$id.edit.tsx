import { createFileRoute } from '@tanstack/react-router'
import EditMovie from '../../pages/Edit'

export const Route = createFileRoute('/movies_/$id/edit')({
  component: EditMovie,
})
