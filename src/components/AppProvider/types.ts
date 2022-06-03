import { Genre } from '../../data/genres'

export type AppState = {
  loading: boolean
  error: string | null
  genres: Genre[]
}

export type AppActionType =
  | {
      type: 'setGenres'
      genres: Genre[]
    }
  | { type: 'setLoading'; value: boolean }
  | { type: 'setError'; value: string | null }
