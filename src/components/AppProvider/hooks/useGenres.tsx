import { useContext, useCallback } from 'react'
import { AppContext } from '../AppProvider'

export const useGenres = () => {
  const {
    state: { genres },
  } = useContext(AppContext)

  const getGenreName = useCallback(
    (genreId: number) => {
      const result = genres.filter((item) => item.id === genreId)
      return result[0]?.name || null
    },
    [genres],
  )

  const getGenreId = useCallback(
    (genreName: string) => {
      const result = genres.filter((item) => item.name === genreName)
      return result[0]?.id || null
    },
    [genres],
  )

  return {
    genres,
    getGenreName,
    getGenreId,
  }
}

export default useGenres
