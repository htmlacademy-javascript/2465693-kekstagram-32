import { renderBigPhoto } from './rendering-full-photo';

const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const containerElement = document.querySelector('.pictures');

const photosElement = document.createDocumentFragment();

const removePictures = () => {
  const pictureElements = () => document.querySelectorAll('.picture');
  pictureElements().forEach((picture) => picture.remove());
};

const createPhoto = (picture) => {
  const photoElement = pictureTemplateElement.cloneNode(true);
  photoElement.querySelector('.picture__img').src = picture.url;
  photoElement.querySelector('.picture__img').alt = picture.description;
  photoElement.querySelector('.picture__likes').textContent = picture.likes;
  photoElement.querySelector('.picture__comments').textContent = picture.comments.length;
  photoElement.querySelector('.picture__img').dataset.photoId = picture.id;
  return photoElement;
};

const renderingPicture = (arrayPictures) => {
  removePictures();
  renderBigPhoto(arrayPictures);
  arrayPictures.forEach((picture) => {
    const photoElement = createPhoto(picture);
    photosElement.append(photoElement);
  });
  containerElement.append(photosElement);
};

export { renderingPicture };
