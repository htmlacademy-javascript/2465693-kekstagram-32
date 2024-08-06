const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const formElement = document.querySelector('.img-upload__form');
const buttonPlusScaleElement = formElement.querySelector('.scale__control--bigger');
const buttonMinusScaleElement = formElement.querySelector('.scale__control--smaller');
const scaleValueElement = formElement.querySelector('.scale__control--value');
const uploadPhotoElement = formElement.querySelector('.img-upload__preview img');

const scaleImage = (scale) => {
  scaleValueElement.value = `${scale}%`;
  uploadPhotoElement.style.transform = `scale(${scale / 100})`;
};

const onScaleMinusClick = () => {
  const scaleMinus = Math.max(parseInt(scaleValueElement.value, 10) - STEP_SCALE, MIN_SCALE);
  scaleImage(scaleMinus);
};

const onScalePlusClick = () => {
  const scalePlus = Math.min(parseInt(scaleValueElement.value, 10) + STEP_SCALE, MAX_SCALE);
  scaleImage(scalePlus);
};

const defaultScale = () => {
  scaleImage(DEFAULT_SCALE);
};

//обработчик масштабирования
buttonMinusScaleElement.addEventListener('click', onScaleMinusClick);
buttonPlusScaleElement.addEventListener('click', onScalePlusClick);

export { defaultScale };
