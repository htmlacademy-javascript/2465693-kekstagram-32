import { isEscapeKey } from './util.js';
import { arrayPhotos } from './data.js';

const ContainerPhotoElements = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');
const commentCountElements = document.querySelector('.social__comment-count');
const commentLoaderElement = document.querySelector('.comments-loader');
const commentListElements = document.querySelector('.social__comments');

//закрытие по ESC
const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentEscKeydown);
  }
};

//открывает модальное окно
const openBigPhoto = () => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentCountElements.classList.add('hidden');
  commentLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentEscKeydown);
};

//закрывает модальное окно
const closeBigPhoto = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

//создание одного комментария для списка
const getComment = ({ avatar, name, message }) => {
  const comment = document.querySelector('.social__comment').cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

//создание списка комментариев
const displayComments = (comments) => {
  const commentsFragmentElement = document.createDocumentFragment();

  comments.forEach((element) => {
    const newComment = getComment(element);
    commentsFragmentElement.append(newComment);
  });
  commentListElements.innerHTML = '';
  commentListElements.append(commentsFragmentElement);
};

//получаем данные для большого фото
const getDataBigPhoto = (photoId) => {
  bigPictureElement.querySelector('img').src = arrayPhotos[photoId - 1].url;
  bigPictureElement.querySelector('.likes-count').textContent = arrayPhotos[photoId - 1].likes;
  bigPictureElement.querySelector('.social__comment-shown-count').textContent =
    arrayPhotos[photoId - 1].comments.length;
  bigPictureElement.querySelector('.social__comment-total-count').textContent =
    arrayPhotos[photoId - 1].comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = arrayPhotos[photoId - 1].description;
  displayComments(arrayPhotos[photoId - 1].comments);
};

//функция
const onClickPhoto = (evt) => {
  if (evt.target.closest('.picture')) {
    const currentPhotoId = evt.target.dataset.photoId;
    getDataBigPhoto(currentPhotoId);
    openBigPhoto();
  }
};

//обработчик по нажатию мышкой на миниатюру
ContainerPhotoElements.addEventListener('click', onClickPhoto);

//обработчик по нажатию мышкой на закрытие окна
bigPictureCloseElement.addEventListener('click', () => {
  closeBigPhoto();
});
