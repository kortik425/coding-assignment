import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../data/moviesSlice'

export const useInfiniteScroll = ({fetchStatus, page, total_pages, apiUrl}) => {
  const dispatch = useDispatch()

  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop
    const threshold = document.documentElement.offsetHeight - 200
    if (
      scrollPosition >= threshold &&
      fetchStatus !== 'loading' &&
      page < total_pages
    ) {
      dispatch(fetchMovies({ apiUrl, page: page + 1 }))
    }
  }, [apiUrl, fetchStatus, page, total_pages])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])
} 