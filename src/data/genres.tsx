import { fetcher } from '.'
import useSWR from 'swr'

export const useGenres = () => {
  const { data, error } = useSWR<GenreResponse, Error>(
    '/genre/movie/list',
    fetcher,
  )

  return {
    loading: !error && !data,
    error,
    genres: data?.genres || [],
  }
}

export default useGenres

type GenreResponse = {
  genres: Genre[]
}

export type Genre = {
  id: number
  name: string
}
