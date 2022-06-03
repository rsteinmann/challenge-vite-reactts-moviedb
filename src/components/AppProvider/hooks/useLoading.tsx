import { useContext } from 'react'
import { AppContext } from '../AppProvider'

export const useLoading = () => {
  const {
    state: { loading },
  } = useContext(AppContext)

  return loading
}

export default useLoading
