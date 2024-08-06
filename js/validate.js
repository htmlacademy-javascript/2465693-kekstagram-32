import { sendData } from './api.js';
import { onErrorUpload, onSuccessUpload } from './messages.js';

const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const MAX_COUNT_HASHTAG = 5;
const ErrorText = {
  INVALID_COUNT: `превышено количество хэштегов, более: ${MAX_COUNT_HASHTAG}`,
  NOT_UNIQUE: 'хэштеги повторяются',
  INVALID_PATTERN: 'введён невалидный хэштег',
};

const form = document.querySelector('.img-upload__form');
const submitButtonElement = form.querySelector('.img-upload__submit');
const hashtagInputElement = form.querySelector('.text__hashtags');

const SubmitButtonText = {
  IDLE: 'Отправить',
  SENDING: 'Отправляю...',
};

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

//блокировка кнопки опубликовать
const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

//проверка и публикация фото
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

export { pristine, setUserPhotoSubmit };
