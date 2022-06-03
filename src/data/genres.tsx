import { useState, useEffect } from 'react'
import { defaultOptions } from '.'

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    ;(async () => {
      try {
        const fetchedCategories = await fetchGenres()
        setGenres(fetchedCategories)
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch movies data')
      }
    })()
  }, [])

  return {
    loading,
    error,
    genres,
  }
}

export const fetchGenres = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list`,
    defaultOptions,
  )
  if (res?.status === 200) {
    const { genres }: GenreResponse = await res.json()
    return genres
  } else {
    throw new Error('failed')
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
