import { useCallback, useEffect, useState } from 'react'
import { fetcher } from '.'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { Genre } from './genres'

export const useMovies = (genreId: number) => {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: MoviesResponse) => {
      // reached the end
      if (previousPageData?.results && !previousPageData.results.length)
        return null
      // first page
      if (pageIndex === 0)
        return `/discover/movie?page=1&with_genres=${genreId}`
      return `/discover/movie?page=${pageIndex + 1}&with_genres=${genreId}`
    },
    [genreId],
  )
  const { data, error, size, setSize } = useSWRInfinite<MoviesResponse, Error>(
    getKey,
    fetcher,
  )
  const [movies, setMovies] = useState<MoviePreview[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchNext = useCallback(() => {
    setSize(size + 1)
  }, [size])

  useEffect(() => {
    if (data && data.length > 0) {
      setMovies((prevState) => {
        return [...prevState, ...data[data.length - 1].results]
      })
      setLoading(false)
    }
  }, [data])

  return {
    loading: loading,
    error,
    movies,
    fetchNext,
  }
}

export const useMovie = (movieId: number) => {
  const { data, error } = useSWR<Movie, Error>(`/movie/${movieId}`, fetcher)
  return {
    loading: !error && !data,
    error,
    movie: data,
  }
}

type Movie = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

type MoviesResponse = {
  page: number
  results: MoviePreview[]
  total_pages: number
  total_results: number
}

type MoviePreview = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
