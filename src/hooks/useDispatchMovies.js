import { useEffect, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchMovies } from '../data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants'

export const useDispatchMovies = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const initialLoad = useRef(true)
  const { movies, fetchStatus, page, total_pages } = useSelector(state => state.movies)

  const searchQuery = searchParams.get('search') || ''

  const getApiUrl = (query) => {
    if (query && query.trim() !== '') {
      return `${ENDPOINT_SEARCH}&query=${encodeURIComponent(query)}`
    } else {
      return ENDPOINT_DISCOVER
    }
  }

  const apiUrl = useMemo(() => getApiUrl(searchQuery), [searchQuery, getApiUrl]);

  // Fetch movies on mount or when search query changes
  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    } 
    dispatch(fetchMovies({ apiUrl, page: 1 }))
  }, [searchQuery, dispatch])

  const isMoviesListLoading = fetchStatus === 'loading' && (!movies || movies.length === 0)
  const isMoviesListError = fetchStatus === 'error'

  return {
    movies,
    isMoviesListLoading,
    isMoviesListError,
    page,
    total_pages,
    fetchStatus,
    apiUrl
  }
} 