import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.params = {
  api_key: 'c665198cf22d79697e7d5dc85f192a7c',
};

export const getTrendingMovies = async () => {
  const { data } = await axios.get(`trending/movie/day`, {
    params: {
      page: 1,
    },
  });
  return data;
};

export const searchMovies = async query => {
  const { data } = await axios.get(`search/movie`, {
    params: {
      query: query,
      page: 1,
    },
  });
  return data;
};

export const getMovieDetails = async id => {
  const { data } = await axios.get(`movie/${id}`);
  return data;
};

export const getMovieCredits = async id => {
  const { data } = await axios.get(`movie/${id}/credits`);
  return data.cast;
};

export const getMovieReviews = async id => {
  const { data } = await axios.get(`movie/${id}/reviews`);
  return data.results;
};
