import React from 'react'
import useFetch from '../../hooks/useFetch'
interface ContextI {
  data?: ResponseT | null
  loading?: boolean | null
  error?: string | null
}
interface Props {
  children?: React.ReactNode
}
const StoreContext = React.createContext<ContextI>({})

const StoreProvider: React.FC<Props> = ({ children }) => {
  const { data, error, loading } = useFetch(process.env.REACT_APP_API_URL || '')
  return (
    <StoreContext.Provider
      value={{
        data,
        error,
        loading,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export { StoreProvider, StoreContext }
