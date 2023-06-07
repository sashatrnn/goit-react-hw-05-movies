import { Suspense } from 'react';
import { Loader } from 'components/Loader/Loader';
import { Navigation } from 'components/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import css from './SharedLayout.module.css';

export default function SharedLayout() {
  return (
    <div className={css.layout}>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
