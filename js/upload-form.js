import { pristine } from './validate.js';
import { isEscapeKey } from './util.js';
import { defaultScale } from './image-scale.js';
import { defaultEffect, initialSlider } from './image-effect.js';
import { sendData } from './api.js';
import { onErrorUpload, onSuccessUpload } from './messages.js';

const SubmitButtonText = {
  IDLE: 'Отправить',
  SENDING: 'Отправляю...',
};

const form = document.querySelector('.img-upload__form');

const cancelButtonElement = form.querySelector('.img-upload__cancel');
const descriptionElement = form.querySelector('.text__description');
const effectsPreviewsElement = form.querySelectorAll('.effects__preview');
const imageOverlayElement = form.querySelector('.img-upload__overlay');
const inputUploadElement = form.querySelector('.img-upload__input');
const hashtagInputElement = form.querySelector('.text__hashtags');
const uploadPhotoElement = form.querySelector('.img-upload__preview img');
const submitButtonElement = form.querySelector('.img-upload__submit');

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

const isTextFieldFocused = () =>
  document.activeElement === hashtagInputElement || document.activeElement === descriptionElement;

//закрытие модального окна
const closeModal = () => {
  form.reset();
  pristine.reset();
  defaultScale();
  defaultEffect();
  imageOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

//закрытие по ESC модального окна
function onDocumentEscKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageShown()) {
    evt.preventDefault();
    closeModal();
  }
}

//закрытие по крестику
const onCancelButtonClick = () => {
  closeModal();
};

//открытие модального окна
const openModal = () => {
  imageOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
  initialSlider();
  submitButtonElement.disabled = false;
};

//получение данных о загружаемом фото
const onFileInputChange = () => {
  const file = inputUploadElement.files[0];
  if (file) {
    uploadPhotoElement.src = URL.createObjectURL(file);
    effectsPreviewsElement.forEach((preview) => {
      preview.style.backgroundImage = `url('${uploadPhotoElement.src}')`;
    });
  }
  openModal();
};

//блокировка кнопки опубликовать
const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

//публикация фото
const setUserPhotoSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      toggleSubmitButton(true);
      const formData = new FormData(evt.target);

      sendData(formData)
        .then(() => {
          onSuccessUpload();
          toggleSubmitButton(false);
        })
        .then(() => {
          onSuccess();
        })
        .catch(() => {
          onErrorUpload();
          toggleSubmitButton(false);
        });
    }
  });
};

//обработчик при изменении формы
inputUploadElement.addEventListener('change', onFileInputChange);

//обработчик по нажатию мышкой на закрытие окна
cancelButtonElement.addEventListener('click', onCancelButtonClick);

setUserPhotoSubmit(closeModal);

export { closeModal, openModal };
