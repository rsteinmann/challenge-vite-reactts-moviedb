export { useGenres } from './genres'
export { useMovies, useMovie } from './movies'

export const defaultOptions = {
  headers: new Headers({
    Authorization: `Bearer ${import.meta.env.VITE_APP_API_ACCESS_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  }),
}
