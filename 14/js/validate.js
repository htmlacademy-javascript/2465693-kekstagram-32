import { onErrorUpload, onSuccessUpload } from './messages.js';
import { sendData } from './api.js';

const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const MAX_COUNT_HASHTAG = 5;
const ErrorText = {
  INVALID_COUNT: `превышено количество хэштегов, более: ${MAX_COUNT_HASHTAG}`,
  NOT_UNIQUE: 'хэштеги повторяются',
  INVALID_PATTERN: 'введён невалидный хэштег',
};

const formElement = document.querySelector('.img-upload__form');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const hashtagInputElement = formElement.querySelector('.text__hashtags');

const SubmitButtonText = {
  IDLE: 'Отправить',
  SENDING: 'Отправляю...',
};

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const normalizeTags = (tagString) =>
  tagString
    .trim()
    .split(' ')
    .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => HASHTAG_SYMBOLS.test(tag));

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const hasValidCount = (value) => normalizeTags(value).length <= MAX_COUNT_HASHTAG;

pristine.addValidator(hashtagInputElement, hasValidTags, ErrorText.INVALID_PATTERN, 2, true);

pristine.addValidator(hashtagInputElement, hasUniqueTags, ErrorText.NOT_UNIQUE, 1, true);

pristine.addValidator(hashtagInputElement, hasValidCount, ErrorText.INVALID_COUNT, 3, true);

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

const setUserPhotoSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
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

export { isValidType, pristine, setUserPhotoSubmit };
