import { TheMovieDBApi } from './fetchfilm';
import filmcard from '../templates/filmcard.hbs';
import Notiflix from 'notiflix';

const api = new TheMovieDBApi();
const formEl = document.querySelector('.search__form');
const inputEl = document.querySelector('.js-inputSearch');
const mainListEl = document.querySelector('.js-home-page');

const onInputChange = async evt => {
  const inputValue = evt.target.value.trim();
  if (inputValue === '') {
    return;
  }
  api.setQuery(inputValue);
  const getQueryFilms = await api.fetchFilms();
  const filmArray = getQueryFilms.data.results;
  if (filmArray.length === 0) {
    Notiflix.Notify.warning('Nothing found');
    return;
  }
  const textFilmRender = filmcard(filmArray);

  mainListEl.innerHTML = textFilmRender;
};

formEl.addEventListener('input', onInputChange);
