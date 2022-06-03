import { AppState, AppActionType } from './types'

export const AppReducer = (state: AppState, action: AppActionType) => {
  switch (action.type) {
    case 'setGenres':
      // TODO: check genres here
      return {
        ...state,
        genres: action.genres,
      }

    case 'setLoading':
      return {
        ...state,
        loading: action.value,
      }

    case 'setError':
      return {
        ...state,
        error: action.value,
      }
  }
}
