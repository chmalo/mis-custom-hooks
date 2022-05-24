import { useEffect, useRef, useState } from "react"
import axios from "axios";

export const useFetch = (url: string) => {
  const isMounted = useRef(true)
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    setState({ data: null, loading: true, error: null })

    axios(url)
      .then((resp) => resp.data)
      .then((data) => {
        isMounted.current && setState({
          loading: false,
          error: null,
          data,
        });
      }).catch(() => {
        setState({
          data: null,
          loading: false,
          error: 'No se pudo cargar la info'
        })
    })
  }, [url])

  return state
}
