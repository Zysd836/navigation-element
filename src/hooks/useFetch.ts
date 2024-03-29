import { useState, useEffect } from 'react'
import axios from 'axios'

function useFetch(url: string) {
  const [data, setData] = useState<ResponseT | null>(null)
  const [loading, setLoading] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setData(null)
    setError(null)
    const source = axios.CancelToken.source()
    axios
      .get(url, { cancelToken: source.token })
      .then((res) => {
        setLoading(false)
        //checking for multiple responses for more flexibility
        //with the url we send in.
        res.data && setData(res.data)
      })
      .catch((err) => {
        setLoading(false)
        setError('Error...')
      })
    return () => {
      source.cancel()
    }
  }, [url])

  return { data, loading, error }
}
export default useFetch
