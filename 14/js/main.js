import { closeModal } from './upload-form.js';
import { getData } from './api.js';
import { initializeFilter } from './filter.js';
import { onErrorData } from './messages.js';
import { renderingPicture } from './rendering-thumbnails.js';
import { setUserPhotoSubmit } from './validate.js';

getData()
  .then((arrayPhotos) => {
    renderingPicture(arrayPhotos);
    initializeFilter(arrayPhotos);
  })
  .catch((err) => {
    onErrorData(err.message);
  });

setUserPhotoSubmit(closeModal);
