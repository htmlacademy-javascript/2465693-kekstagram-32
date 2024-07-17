const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const photosElement = document.createDocumentFragment();

const createPhoto = (picture) => {
  const photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = picture.url;
  photoElement.querySelector('.picture__img').alt = picture.description;
  photoElement.querySelector('.picture__likes').textContent = picture.likes;
  photoElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return photoElement;
};

const renderingPicture = (arrayPictures) => {
  arrayPictures.forEach((picture) => {
    const photoElement = createPhoto(picture);
    photosElement.append(photoElement);
  });

  container.append(photosElement);
};

export { renderingPicture };
