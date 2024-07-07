import { createPhotoId } from './data.js';

const NUMBERS_OF_PHOTOS = 25;

const createArrayPhotos = Array.from({ length: NUMBERS_OF_PHOTOS }, createPhotoId);

// eslint-disable-next-line no-console
console.log(createArrayPhotos);
