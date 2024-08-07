import { isValidType, pristine } from './validate.js';
import { isEscapeKey } from './util.js';
import { defaultScale } from './image-scale.js';
import { defaultEffect, initialSlider } from './image-effect.js';

const formElement = document.querySelector('.img-upload__form');

const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const descriptionElement = formElement.querySelector('.text__description');
const effectsPreviewsElement = formElement.querySelectorAll('.effects__preview');
const imageOverlayElement = formElement.querySelector('.img-upload__overlay');
const inputUploadElement = formElement.querySelector('.img-upload__input');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const uploadPhotoElement = formElement.querySelector('.img-upload__preview img');
const submitButtonElement = formElement.querySelector('.img-upload__submit');

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

const isTextFieldFocused = () =>
  document.activeElement === hashtagInputElement || document.activeElement === descriptionElement;

const closeModal = () => {
  formElement.reset();
  pristine.reset();
  defaultScale();
  defaultEffect();
  imageOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

function onDocumentEscKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageShown()) {
    evt.preventDefault();
    closeModal();
  }
}

const onCancelButtonClick = () => {
  closeModal();
};

const openModal = () => {
  imageOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
  initialSlider();
  submitButtonElement.disabled = false;
};

const onFileInputChange = () => {
  const file = inputUploadElement.files[0];
  if (file && isValidType(file)) {
    uploadPhotoElement.src = URL.createObjectURL(file);
    effectsPreviewsElement.forEach((preview) => {
      preview.style.backgroundImage = `url('${uploadPhotoElement.src}')`;
    });
  }
  openModal();
};

inputUploadElement.addEventListener('change', onFileInputChange);

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export { closeModal, openModal };
