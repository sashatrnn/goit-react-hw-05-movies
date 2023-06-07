import css from './Navigation.module.css'
import { NavLink } from 'react-router-dom';

const navItems = [
    { href: '/', text: 'Home' },
    { href: 'movies', text: 'Movies' },
  ];
  
  export const Navigation = () => {
    return (
      <header className={css.header}>
        <nav className={css.nav}>
          {navItems.map(({ href, text }) => (
            <NavLink  className={css.navItem} to={href} key={href}>
              {text}
            </NavLink>
          ))}
        </nav>
      </header>
    );
  };