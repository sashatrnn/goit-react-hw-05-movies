import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieCredits } from 'services/moviesApi';
import { Loader } from 'components/Loader/Loader';
import css from './Cast.module.css';

export default function Cast() {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) {
      return;
    }
    const getCast = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieCredits(movieId);
        setCast([...data]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {cast.length > 0 ? (
        <ul className={css.castList}>
          {cast.map(({ profile_path, character, original_name, id }) => {
            return (
              <li className={css.castItem} key={id}>
                <img
                  className={css.castImg}
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
                  }
                  alt={original_name}
                />
                <p className={css.castText}>{original_name}</p>
                <p className={css.castText}>"{character}"</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Sorry, we have no information about cast of this movie</p>
      )}
    </>
  );
}