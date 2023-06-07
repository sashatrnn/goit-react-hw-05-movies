import { useState, useEffect } from 'react';
import { getTrendingMovies } from 'services/moviesApi';
import { Loader } from 'components/Loader/Loader';
import { MovieList } from 'components/MovieList/MovieList';
import css from './Home.module.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const movies = await getTrendingMovies();
        setMovies(movies.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <main className={css.main}>
      <h1 className={css.title}>Trending today</h1>
      {isLoading ? <Loader /> : <MovieList movies={movies} link={'movies/'} />}
    </main>
  );
}
