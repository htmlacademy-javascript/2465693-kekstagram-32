import { isEscapeKey } from './util';

const ERROR_TIMEOUT = 5000;

const dataErrorTemplateElement = document.querySelector('#data-error').content;
const uploadErrorTemplateElement = document.querySelector('#error').content;
const uploadSuccessTemplateElement = document.querySelector('#success').content;

//сообщение при ошибке загрузки данных с сервера
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

//закрытие окна сообщения
const onInfoUploadClose = () => {
  const shownInfoUploadElement = document.querySelector('.success') || document.querySelector('.error');
  shownInfoUploadElement.remove();
  document.removeEventListener('keydown', onEscKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

//закрытие окна по клику на любом месте вне окна
function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  onInfoUploadClose();
}

//закрытие окна по Esc
function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onInfoUploadClose();
  }
}

//сообщение c результатом загрузки изображения
const showUploadInfo = (templateElement, buttonClass) => {
  const buttonCloseElement = templateElement.querySelector(buttonClass);

  document.body.append(templateElement);
  buttonCloseElement.addEventListener('click', onInfoUploadClose);
  document.addEventListener('keydown', onEscKeydown);
  document.body.addEventListener('click', onBodyClick);
};

//сообщение при успешной загрузке
const onSuccessUpload = () => {
  showUploadInfo(uploadSuccessTemplateElement, '.success__button');
};

//сообщение при ошибке загрузки
const onErrorUpload = () => {
  showUploadInfo(uploadErrorTemplateElement, '.error__button');
};

export { onErrorData, onSuccessUpload, onErrorUpload };
