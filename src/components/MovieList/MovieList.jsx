import { useLocation } from 'react-router-dom';
import propTypes from 'prop-types';
import css from './MovieList.module.css';
import { NavLink } from 'react-router-dom';

export const MovieList = ({ movies, link }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(({ poster_path, name, title, id }) => {
        return (
          <li className={css.movieItem} key={id}>
            <NavLink
              className={css.navItem}
              to={`${link}${id}`}
              state={{ from: location }}
            >
              <img
                className={css.movieImage}
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
                }
                alt={title}
              />

              <h3 className={css.movieName}>{name || title}</h3>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

MovieList.propTypes = {
  movies: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string,
      title: propTypes.string,
    }).isRequired
  ).isRequired,
  link: propTypes.string,
};
