import { isEscapeKey } from './util.js';
import { defaultScale } from './image-scale.js';
import { defaultEffect, initialSlider } from './image-effect.js';
import { sendData } from './api.js';
import { onErrorUpload, onSuccessUpload } from './messages.js';

const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COUNT_HASHTAG = 5;
const ErrorText = {
  INVALID_COUNT: `превышено количество хэштегов, более: ${MAX_COUNT_HASHTAG}`,
  NOT_UNIQUE: 'хэштеги повторяются',
  INVALID_PATTERN: 'введён невалидный хэштег',
};

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

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const normalizeTags = (tagString) =>
  tagString
    .trim()
    .split(' ')
    .filter((tag) => Boolean(tag.length));

//проверка хэштегов c regexp
const hasValidTags = (value) => normalizeTags(value).every((tag) => HASHTAG_SYMBOLS.test(tag));

//проверка хэштегов на уникалность
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

//проверка количества хэштегов
const hasValidCount = (value) => normalizeTags(value).length <= MAX_COUNT_HASHTAG;

pristine.addValidator(hashtagInputElement, hasValidTags, ErrorText.INVALID_PATTERN, 2, true);

pristine.addValidator(hashtagInputElement, hasUniqueTags, ErrorText.NOT_UNIQUE, 1, true);

pristine.addValidator(hashtagInputElement, hasValidCount, ErrorText.INVALID_COUNT, 3, true);

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

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

const isTextFieldFocused = () =>
  document.activeElement === hashtagInputElement || document.activeElement === descriptionElement;

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

const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

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
          toggleSubmitButton(false);
          onSuccess();
        })
        .catch(() => {
          toggleSubmitButton(false);
          onErrorUpload();
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
