import { useCallback, useEffect, useState } from 'react'
import { defaultOptions } from '.'
import { Genre } from './genres'

export const useMovies = (genreId: number) => {
  const [page, setPage] = useState<number>(1)
  const [movies, setMovies] = useState<MoviePreview[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>()

  const fetchNext = useCallback(async () => {
    setLoading(true)
    const nextPage = page + 1
    const { results } = await fetchMovies(genreId, nextPage)
    setMovies((prevState) => [...prevState, ...results])
    setPage(nextPage)
    setLoading(false)
  }, [page])

  useEffect(() => {
    ;(async () => {
      try {
        const { results } = await fetchMovies(genreId, 1)
        setMovies(results)
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch movies data')
      }
    })()
  }, [genreId])

  return {
    loading,
    error,
    movies,
    fetchNext,
  }
}

export const fetchMovies = async (genreId: number, page: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?page=${page}&with_genres=${genreId}`,
    defaultOptions,
  )
  if (res?.status === 200) {
    const data: MoviesResponse = await res.json()
    return data
  } else {
    throw new Error('failed')
  }
}

export const useMovie = (movieId: number) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>()
  const [movie, setMovie] = useState<Movie>()

  useEffect(() => {
    console.log('trig')
    ;(async () => {
      try {
        const movie = await fetchMovie(movieId)
        setMovie(movie)
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch movies data')
      }
    })()
  }, [movieId])

  return {
    loading,
    error,
    movie: movie,
  }
}

export const fetchMovie = async (movieId: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    defaultOptions,
  )
  if (res?.status === 200) {
    const movie: Movie = await res.json()
    return movie
  } else {
    throw new Error('failed')
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
