import { renderingPicture } from './rendering-thumbnails.js';
import { renderBigPhoto } from './rendering-full-photo.js';
import './upload-form.js';
import { getData } from './api.js';
import { onErrorData } from './messages.js';

getData()
  .then((arrayPhotos) => {
    renderingPicture(arrayPhotos);
    renderBigPhoto(arrayPhotos);
  })
  .catch((err) => {
    onErrorData(err.message);
  });
