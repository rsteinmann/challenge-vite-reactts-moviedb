import React, { useState, useReducer, useEffect, createContext } from 'react'
import { AppState, AppActionType } from './types'
import { AppReducer } from './AppReducer'
import { useGenres } from '../../data'

type Props = {
  children?: React.ReactNode
}

type AppContextState = {
  state: AppState
  dispatch: React.Dispatch<AppActionType>
}

const getDefaultState = (): AppState => ({
  loading: true,
  error: null,
  genres: [],
})

export const AppContext = createContext<AppContextState>({
  state: getDefaultState(),
  dispatch: () => {},
})

export const AppProvider: React.FC<Props> = ({ children }) => {
  const { loading, error, genres } = useGenres()

  // Setup Provider State
  const [state, dispatch] = useReducer<React.Reducer<AppState, AppActionType>>(
    AppReducer,
    getDefaultState(),
  )

  // Setup Context State
  const [contextValue, setContextValue] = useState<AppContextState>({
    state,
    dispatch,
  })

  // Merge local state into context state
  useEffect(() => {
    setContextValue((contextState: AppContextState) => ({
      ...contextState,
      state,
    }))
  }, [state])

  // update state for fetching genres
  useEffect(() => {
    dispatch({ type: 'setLoading', value: loading })
  }, [loading])
  useEffect(() => {
    dispatch({ type: 'setError', value: error || null })
  }, [error])
  useEffect(() => {
    dispatch({ type: 'setGenres', genres: genres || [] })
  }, [genres])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export default AppProvider
