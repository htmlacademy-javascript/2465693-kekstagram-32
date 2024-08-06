import { debounce } from './util.js';
import { renderingPicture } from './rendering-thumbnails.js';

const RANDOM_PHOTO_COUNT = 10;
const RERENDER_DELAY = 500;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const imageFilterElement = document.querySelector('.img-filters');
let photos = [];

//сортировка
const sortComments = (firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length;

//задаем по выбору кнопки данные для фильтров
const onChangeFilter = (evt) => {
  let arrayFilterPhotos = photos;
  const activeButtonElement = document.querySelector('.img-filters__button--active');
  if (activeButtonElement.id === evt.target.id) {
    return;
  }
  evt.target.classList.add('img-filters__button--active');
  activeButtonElement.classList.remove('img-filters__button--active');

  switch (evt.target.id) {
    case Filter.RANDOM:
      arrayFilterPhotos = [...photos]
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, RANDOM_PHOTO_COUNT);
      break;
    case Filter.DISCUSSED:
      arrayFilterPhotos = [...photos].sort(sortComments);
      break;
    default:
      arrayFilterPhotos = [...photos];
  }

  const debounceRender = debounce(() => renderingPicture(arrayFilterPhotos), RERENDER_DELAY);
  debounceRender();
};

//инициализация фильтров
const initializeFilter = (arrayPhotos) => {
  imageFilterElement.classList.remove('img-filters--inactive');
  imageFilterElement.addEventListener('click', onChangeFilter);
  photos = [...arrayPhotos];
};

export { initializeFilter };
