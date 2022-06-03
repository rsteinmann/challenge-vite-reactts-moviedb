import { useContext } from 'react'
import { AppContext } from '../AppProvider'

export const useError = () => {
  const {
    state: { error },
  } = useContext(AppContext)

  return error
}

export default useError
