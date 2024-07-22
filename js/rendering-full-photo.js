import { isEscapeKey } from './util.js';

const renderBigPhoto = (arrayPhotos) => {
  const bigPictureElement = document.querySelector('.big-picture');
  const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
  const commentCountElement = document.querySelector('.social__comment-count');
  const commentListElement = document.querySelector('.social__comments');
  const commentElement = document.querySelector('.social__comment');
  const commentLoaderElement = document.querySelector('.comments-loader');
  const containerPhotoElement = document.querySelector('.pictures');

  commentCountElement.classList.add('hidden');
  commentLoaderElement.classList.add('hidden');

  //закрытие по ESC
  const onDocumentEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPhoto();
    }
  };

  //закрывает модальное окно
  function closeBigPhoto() {
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentEscKeydown);
  }

  //открывает модальное окно
  const openBigPhoto = () => {
    bigPictureElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentEscKeydown);
  };

  //создание одного комментария для списка
  const getComment = ({ avatar, name, message }) => {
    const comment = commentElement.cloneNode(true);
    const socialPictureElement = comment.querySelector('.social__picture');

    socialPictureElement.src = avatar;
    socialPictureElement.alt = name;
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
    commentListElement.innerHTML = '';
    commentListElement.append(commentsFragmentElement);
  };

  //получаем данные для большого фото
  const getDataBigPhoto = (photoId) => {
    const index = arrayPhotos.findIndex((photo) => photoId === photo.id.toString());
    const { url, likes, comments, description } = arrayPhotos[index];

    bigPictureElement.querySelector('.big-picture__img img').src = url;
    bigPictureElement.querySelector('.likes-count').textContent = likes;
    bigPictureElement.querySelector('.social__comment-shown-count').textContent = comments.length;
    bigPictureElement.querySelector('.social__comment-total-count').textContent = comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = description;
    displayComments(arrayPhotos[index].comments);
  };

  //функция для отрисовки фото по выбранной миниатюре
  const onClickPhoto = (evt) => {
    if (evt.target.closest('.picture')) {
      const currentPhotoId = evt.target.dataset.photoId;
      getDataBigPhoto(currentPhotoId);
      openBigPhoto();
    }
  };

  //обработчик по нажатию мышкой на миниатюру
  containerPhotoElement.addEventListener('click', onClickPhoto);

  //обработчик по нажатию мышкой на закрытие окна
  bigPictureCloseElement.addEventListener('click', () => {
    closeBigPhoto();
  });
};

export { renderBigPhoto };
