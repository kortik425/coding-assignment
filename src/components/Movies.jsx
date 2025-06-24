import Movie from './Movie'
import '../styles/movies.scss'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { useDispatchMovies } from '../hooks/useDispatchMovies'

const Movies = ({ viewTrailer }) => {
    const { 
        movies, 
        isMoviesListLoading, 
        isMoviesListError, 
        page, 
        total_pages, 
        fetchStatus ,
        apiUrl
    } = useDispatchMovies()
    
    useInfiniteScroll({apiUrl, fetchStatus, page, total_pages})
    
    if (isMoviesListLoading) {
        return <div>Loading...</div>
    }
    
    if (isMoviesListError) {
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
