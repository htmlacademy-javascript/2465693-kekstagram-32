import { createPhotoId } from './data.js';

const NUMBERS_OF_PHOTOS = 25;

const createArrayPhotos = Array.from({ length: NUMBERS_OF_PHOTOS }, (_, index) => createPhotoId(index + 1));

// eslint-disable-next-line no-console
console.log(createArrayPhotos);
