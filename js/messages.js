import { isEscapeKey } from './util';

const ERROR_TIMEOUT = 5000;

const dataErrorTemplateElement = document.querySelector('#data-error').content;
const uploadErrorTemplateElement = document.querySelector('#error').content;
const uploadSuccessTemplateElement = document.querySelector('#success').content;

const onErrorData = (errorMessage) => {
  const cloneDataErrorElement = dataErrorTemplateElement.cloneNode(true);
  document.body.append(cloneDataErrorElement);

  const dataErrorShownElement = document.querySelector('.data-error');
  const messageError = document.createElement('p');

  messageError.textContent = errorMessage;
  dataErrorShownElement.append(messageError);
  setTimeout(() => {
    dataErrorShownElement.remove();
  }, ERROR_TIMEOUT);
};

const onInfoUploadClose = () => {
  const shownInfoUploadElement = document.querySelector('.success') || document.querySelector('.error');
  shownInfoUploadElement.remove();
  document.removeEventListener('keydown', onEscKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  onInfoUploadClose();
}

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onInfoUploadClose();
  }
}

const showUploadInfo = (templateElement, buttonClass) => {
  const cloneUploadElement = templateElement.cloneNode(true);
  document.body.append(cloneUploadElement);

  const buttonCloseElement = document.querySelector(buttonClass);
  buttonCloseElement.addEventListener('click', onInfoUploadClose);
  document.addEventListener('keydown', onEscKeydown);
  document.body.addEventListener('click', onBodyClick);
};

const onSuccessUpload = () => {
  showUploadInfo(uploadSuccessTemplateElement, '.success__button');
};

const onErrorUpload = () => {
  showUploadInfo(uploadErrorTemplateElement, '.error__button');
};

export { onErrorData, onSuccessUpload, onErrorUpload };
