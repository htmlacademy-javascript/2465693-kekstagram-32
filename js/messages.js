const ERROR_TIMEOUT = 5000;
const body = document.body;
const dataErrorElement = document.querySelector('#data-error');

const onErrorForm = () => {
  const cloneDataErrorElement = dataErrorElement.cloneNode(true);
  body.append(cloneDataErrorElement);
  setTimeout(() => {
    cloneDataErrorElement.remove();
  }, ERROR_TIMEOUT);
};

export { onErrorForm };
