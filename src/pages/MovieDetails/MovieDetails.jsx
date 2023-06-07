import { useState, useEffect } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import { getMovieDetails } from 'services/moviesApi';
import { Link } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';
import css from './MovieDetails.module.css'

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) {
      return;
    }
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const { poster_path, name, title, overview, genres, vote_average } =
          await getMovieDetails(movieId);
        setMovieDetails({
          poster_path,
          name: name || undefined,
          title: title || undefined,
          vote_average: vote_average.toFixed(2),
          overview,
          genres: genres.map(({ name, id }) => <li key={id}>{name}</li>),
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [movieId]);

  const hasError = error.length > 0;
  const { poster_path, name, title, vote_average, overview, genres } =
    movieDetails;

  return (
    <>
      {hasError ? (
        <p className={css.error}>
          <p>Sorry, movie was not found, try again later</p>
        </p>
      ) : (
        <main className={css.main}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Link className={css.button} to={location.state?.from ?? '/'}>Go back</Link>
              <div className={css.movieItem}>
                <img className={css.moviePoster}
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w500${poster_path}`
                      : 'https://placehold.co/200x300/orange/white?text=There+is+no+poster&font=roboto.png'
                  }
                  alt={name || title}
                />
                <div >
                  <h1 className={css.movieTitle}>{name || title || 'No name'}</h1>
                  <h2 className={css.movieRating}>
                    Rating: {vote_average || 'No votes'}
                  </h2 >
                  <p className={css.title}>Overview:</p>
                  <p className={css.overviewText}>
                    {overview || 'No overview'}
                  </p>
                  <h3 className={css.title}>Genres:</h3>
                  <p className={css.overviewText}>{genres || 'No genres'}</p>
                </div>
              </div>
              <div>
                <ul className={css.more}>
                  <li>
                    <Link className={css.linkItem}
                      to="cast"
                      state={{ from: location.state?.from ?? '/' }}
                    >
                      Cast
                    </Link>
                  </li>
                  <li>
                    <Link className={css.linkItem}
                      to="reviews"
                      state={{ from: location.state?.from ?? '/' }}
                    >
                      Reviews
                    </Link>
                  </li>
                </ul>
              </div>
              <Outlet />
            </>
          )}
        </main>
      )}
    </>
  );
}
