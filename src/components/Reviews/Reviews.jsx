import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieReviews } from 'services/moviesApi';
import css from './Reviews.module.css';
import { Loader } from 'components/Loader/Loader';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) {
      return;
    }
    const getReviews = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieReviews(movieId);
        setReviews([...data]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {reviews.length > 0 ? (
        <ul className={css.reviewList}>
          {reviews.map(({ author, content, id }) => {
            return (
              <li className={css.reviewItem} key={id}>
                <h4 className={css.reviewTitle}>Author: {author}</h4>
                <p className={css.reviewText}>"{content}"</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Sorry, there is no review</p>
      )}
    </>
  );
}
