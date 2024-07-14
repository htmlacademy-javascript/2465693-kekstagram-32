const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const photoFragmentBox = document.createDocumentFragment();

const createPhoto = (picture) => {
  const photo = pictureTemplate.cloneNode(true);
  photo.querySelector('.picture__img').src = picture.url;
  photo.querySelector('.picture__img').alt = picture.description;
  photo.querySelector('.picture__likes').textContent = picture.likes;
  photo.querySelector('.picture__comments').textContent = picture.comments.length;

  return photo;
};

const renderingPicture = (arrayPictures) => {
  for (let i = 0; i < arrayPictures.length; i++) {
    photoFragmentBox.append(createPhoto(arrayPictures[i]));
  }
  container.append(photoFragmentBox);
};

export { renderingPicture };
