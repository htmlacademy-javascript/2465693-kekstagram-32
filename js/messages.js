import { isEscapeKey } from './util';

const ERROR_TIMEOUT = 5000;

const body = document.body;
const dataErrorTemplateElement = document.querySelector('#data-error').content;
const uploadErrorTemplateElement = document.querySelector('#error').content;
const uploadSuccessTemplateElement = document.querySelector('#success').content;

//сообщение при ошибке загрузки данных с сервера
const onErrorData = (errorMessage) => {
  const cloneDataErrorElement = dataErrorTemplateElement.cloneNode(true);
  body.append(cloneDataErrorElement);
  const dataErrorShownElement = document.querySelector('.data-error');
  const messageError = document.createElement('p');
  messageError.textContent = errorMessage;
  dataErrorShownElement.append(messageError);
  setTimeout(() => {
    dataErrorShownElement.remove();
  }, ERROR_TIMEOUT);
};

//закрытие окна сообщения
const onInfoUploadClose = () => {
  const shownInfoUploadElement = document.querySelector('.success') || document.querySelector('.error');
  shownInfoUploadElement.remove();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onBodyClick);
};

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  onInfoUploadClose();
}

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    onInfoUploadClose();
  }
}

//сообщение c результатом загрузки изображения
const showUploadInfo = (templateElement, buttonClass) => {
  const cloneUploadElement = templateElement.cloneNode(true);
  body.append(cloneUploadElement);
  const buttonCloseElement = document.querySelector(buttonClass);
  buttonCloseElement.addEventListener('click', () => {
    onInfoUploadClose();
  });
  document.addEventListener('keydown', onEscKeydown);
  body.addEventListener('click', onBodyClick);
};

const onSuccessUpload = () => {
  showUploadInfo(uploadSuccessTemplateElement, '.success__button');
};

const onErrorUpload = () => {
  showUploadInfo(uploadErrorTemplateElement, '.error__button');
};

export { onErrorData, onSuccessUpload, onErrorUpload };
