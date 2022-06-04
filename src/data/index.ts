export { useGenres } from './genres'
export { useMovies, useMovie } from './movies'

export const apiBaseUrl = 'https://api.themoviedb.org/3'

export const defaultOptions = {
  headers: new Headers({
    Authorization: `Bearer ${import.meta.env.VITE_APP_API_ACCESS_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  }),
}

export const fetcher = (url: string) =>
  fetch(`${apiBaseUrl}${url}`, defaultOptions).then((res) => res.json())
