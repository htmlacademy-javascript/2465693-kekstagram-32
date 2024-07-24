import { arrayPhotos } from './data.js';
import { renderingPicture } from './rendering-thumbnails.js';
import { renderBigPhoto } from './rendering-full-photo.js';
import './upload-form.js';

renderingPicture(arrayPhotos);
renderBigPhoto(arrayPhotos);
