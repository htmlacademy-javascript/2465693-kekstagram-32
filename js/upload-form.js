import { isEscapeKey } from './util.js';

const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COUNT_HASHTAG = 5;
const ErrorText = {
  INVALID_COUNT: `превышено количество хэштегов, более: ${MAX_COUNT_HASHTAG}`,
  NOT_UNIQUE: 'хэштеги повторяются',
  INVALID_PATTERN: 'введён невалидный хэштег',
};

const form = document.querySelector('.img-upload__form');

const buttonSubmit = form.querySelector('#upload-submit');
const cancelButton = form.querySelector('.img-upload__cancel');
const descriptionElement = form.querySelector('.text__description');
const imageOverlayElement = form.querySelector('.img-upload__overlay');
const inputUploadElement = form.querySelector('.img-upload__input');
const hashtagInputElement = form.querySelector('.text__hashtags');
const uploadPhoto = form.querySelector('.img-upload__preview img');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

if (!pristine.validate()) {
  buttonSubmit.disabled = false;
}

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

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

//закрытие модального окна
const closeModal = () => {
  form.reset();
  pristine.reset();
  imageOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

//закрытие по ESC модального окна
const isTextFieldFocused = () =>
  document.activeElement === hashtagInputElement || document.activeElement === descriptionElement;

function onDocumentEscKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
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
};

const onFileInputChange = () => {
  const file = inputUploadElement.files[0];
  if (file) {
    uploadPhoto.src = URL.createObjectURL(file);
  }
  openModal();
};

//обработчик при изменении формы
form.addEventListener('change', onFileInputChange);

//обработчик по нажатию мышкой на закрытие окна
cancelButton.addEventListener('click', onCancelButtonClick);
