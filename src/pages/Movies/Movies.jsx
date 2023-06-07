import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from 'services/moviesApi';
import { MovieList } from 'components/MovieList/MovieList';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import css from './Movies.module.css'
import 'react-toastify/dist/ReactToastify.css';

export default function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const movieName = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!movieName) {
      return;
    }
    const getMovies = async () => {
      setIsLoading(true);
      try {
        setSearchQuery(movieName);
        const data = await searchMovies(movieName);
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [movieName]);

  const handleSubmit = event => {
    event.preventDefault();

    const inputValue = event.target.elements.movieName.value
      .trim()
      .toLowerCase();

    if (inputValue === '') {
      return toast.warning('Please, enter movie name.');
    }

    setSearchParams({ query: searchQuery });
    event.target.reset();
  };

  return (
    <main className={css.main}>
      <div className={css.formWrapper}>
        <form  className={css.form} onSubmit={handleSubmit}>
          <button className={css.button} type="submit"></button>
          <input className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            name="movieName"
            onChange={e => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      {isLoading ? <Loader /> : <MovieList movies={movies} link={''} />}
    </main>
  );
}