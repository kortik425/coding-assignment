import { useSelector } from 'react-redux'
import watchLaterSlice from '../data/watchLaterSlice'
import MoviesList from './MoviesList'

const WatchLater = ({viewTrailer}) => {
    const watchLaterMovies = useSelector((state) => state.watchLater.watchLaterMovies)
    const { removeAllWatchLater } = watchLaterSlice.actions

    return (
        <MoviesList
            movies={watchLaterMovies}
            headerText="Watch Later List"
            emptyIcon="bi bi-heart"
            emptyMessage="You have no movies saved to watch later."
            clearAction={removeAllWatchLater}
            clearButtonText="Empty list"
            dataTestId="watch-later-div"
            moviesDataTestId="watch-later-movies"
            viewTrailer={viewTrailer}
        />
    )
}

export default WatchLater
