//import { arrayPhotos } from './data.js';
import { renderingPicture } from './rendering-thumbnails.js';
import { renderBigPhoto } from './rendering-full-photo.js';
import './upload-form.js';
import { closeModal, setUserPhotoSubmit } from './upload-form.js';
import { getData } from './api.js';
import { onErrorForm } from './messages.js';

getData()
  .then((arrayPhotos) => {
    renderingPicture(arrayPhotos);
    renderBigPhoto(arrayPhotos);
  })
  .catch((err) => {
    onErrorForm(err.message);
  });

setUserPhotoSubmit(closeModal);
