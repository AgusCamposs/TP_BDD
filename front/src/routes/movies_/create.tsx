import { createFileRoute } from '@tanstack/react-router'
import CreateMovie from '../../pages/Create'

export const Route = createFileRoute('/movies_/create')({
  component: CreateMovie,
})
