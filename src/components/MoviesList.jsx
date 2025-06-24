import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Movie from './Movie';
import '../styles/movies.scss';

const MoviesList = ({ 
  movies, 
  headerText, 
  emptyIcon, 
  emptyMessage, 
  clearAction, 
  clearButtonText,
  dataTestId,
  moviesDataTestId,
  viewTrailer
}) => {
  const dispatch = useDispatch()

  return (
    <div className="movies-list-container" data-testid={dataTestId}>
      {movies.length > 0 && (
        <div data-testid={moviesDataTestId}>
          <h6 className="header">{headerText}</h6>
          <div className="movie-list">
            {movies.map((movie) => (
              <Movie 
                movie={movie} 
                key={movie.id}
                viewTrailer={viewTrailer}
              />
            ))}
          </div>

          <footer className="text-center">
            <button className="btn btn-primary" onClick={() => dispatch(clearAction())}>
              {clearButtonText}
            </button>
          </footer>
        </div>
      )}

      {movies.length === 0 && (
        <div className="text-center empty-cart">
          <i className={emptyIcon} />
          <p>{emptyMessage}</p>
          <p>Go to <Link to='/'>Home</Link></p>
        </div>
      )}
    </div>
  )
}

export default MoviesList
