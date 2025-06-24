import { useSelector } from 'react-redux'
import starredSlice from '../data/starredSlice'
import MoviesList from './MoviesList'

const Starred = ({viewTrailer}) => {
    const starredMovies = useSelector((state) => state.starred.starredMovies)
    const { clearAllStarred } = starredSlice.actions

    return (
        <MoviesList
            movies={starredMovies}
            headerText="Starred movies"
            emptyIcon="bi bi-star"
            emptyMessage="There are no starred movies."
            clearAction={clearAllStarred}
            clearButtonText="Remove all starred"
            dataTestId="starred"
            moviesDataTestId="starred-movies"
            viewTrailer={viewTrailer}
        />
    )
}

export default Starred
