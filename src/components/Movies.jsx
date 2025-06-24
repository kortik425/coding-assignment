import Movie from './Movie'
import '../styles/movies.scss'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies } from '../data/moviesSlice'
import { useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants'

const Movies = ({ viewTrailer }) => {
    const { movies, fetchStatus, page, total_pages } = useSelector(state => state.movies)
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''
    const initialLoad = useRef(true)

    const getApiUrl = (query) => {
        if (query && query.trim() !== '') {
            return `${ENDPOINT_SEARCH}&query=${encodeURIComponent(query)}`
        } else {
            return ENDPOINT_DISCOVER
        }
    }

    useEffect(() => {
        if (initialLoad.current) {
            initialLoad.current = false
            return;
        } 
        dispatch(fetchMovies({ apiUrl: getApiUrl(searchQuery), page: 1 }))
    }, [searchQuery, dispatch])

    const handleScroll = useCallback(() => {
        const scrollPosition = window.innerHeight + document.documentElement.scrollTop
        const threshold = document.documentElement.offsetHeight - 200

        if (
            scrollPosition >= threshold &&
            fetchStatus !== 'loading' &&
            page < total_pages
        ) {
            dispatch(fetchMovies({ apiUrl: getApiUrl(searchQuery), page: page + 1 }))
        }
    }, [dispatch, fetchStatus, page, total_pages, searchQuery])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])
    
    if (fetchStatus === 'loading' && (!movies?.length === 0)) {
        return <div>Loading...</div>
    }
    
    if (fetchStatus === 'error') {
        return <div>Error loading movies</div>
    }

    return (
        <div className='movie-list' data-testid="movies">
            {movies?.map((movie) => (
                <Movie 
                    movie={movie} 
                    key={movie.id}
                    viewTrailer={viewTrailer}
                />
            ))}
            {fetchStatus === 'loading' && movies.length > 0 && (
                <span className='scroll-loading-text'>Loading more...</span>
            )}
        </div>
    )
}

export default Movies
