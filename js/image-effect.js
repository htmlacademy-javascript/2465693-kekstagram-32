const ORIGINAL = {
  name: 'original',
  min: 0,
  max: 100,
  step: 1,
};

const form = document.querySelector('.img-upload__form');

const buttonEffectElement = form.querySelector('.img-upload__effects');
const effectValueElement = form.querySelector('.effect-level__value');
const sliderContainerElement = form.querySelector('.img-upload__effect-level');
const sliderElement = form.querySelector('.effect-level__slider');
const uploadPhotoElement = form.querySelector('.img-upload__preview img');
let currentEffect = ORIGINAL;

//применяем фильтр к изображению
const applyEffect = () => {
  const value = effectValueElement.value;
  if (currentEffect.name === 'original') {
    uploadPhotoElement.style.filter = null;
    return;
  }
  uploadPhotoElement.style.filter = `${currentEffect.filter}(${value}${currentEffect.measurement})`;
};

//создаёт слайдер на форме
const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    },
  });
  sliderElement.noUiSlider.on('update', () => {
    effectValueElement.value = sliderElement.noUiSlider.get();
    applyEffect();
  });
  sliderContainerElement.classList.add('hidden');
};

//обновляет значения слайдера после выбора эффекта
const updateSlider = ({ min, max, step }) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
  });
};

//проверяем выбранный radio
const checkSlider = () => {
  sliderContainerElement.classList.toggle('hidden', currentEffect.name === 'original');
  updateSlider(currentEffect);
};

const defaultEffect = () => {
  currentEffect = ORIGINAL;
  checkSlider();
  applyEffect(currentEffect);
  sliderElement.noUiSlider.destroy();
};

//задаем по выбору radio исходные данные для слайдера
const onChangeEffect = (evt) => {
  switch (evt.target.value) {
    case 'none':
      currentEffect = ORIGINAL;
      break;
    case 'chrome':
      currentEffect = {
        name: 'chrome',
        min: 0,
        max: 1,
        step: 0.1,
        filter: 'grayscale',
        measurement: '',
      };
      break;
    case 'sepia':
      currentEffect = {
        name: 'sepia',
        min: 0,
        max: 1,
        step: 0.1,
        filter: 'sepia',
        measurement: '',
      };
      break;
    case 'marvin':
      currentEffect = {
        name: 'marvin',
        min: 0,
        max: 100,
        step: 1,
        filter: 'invert',
        measurement: '%',
      };
      break;
    case 'phobos':
      currentEffect = {
        name: 'phobos',
        min: 0,
        max: 3,
        step: 0.1,
        filter: 'blur',
        measurement: 'px',
      };
      break;
    case 'heat':
      currentEffect = {
        name: 'heat',
        min: 0,
        max: 3,
        step: 0.1,
        filter: 'brightness',
        measurement: '',
      };
      break;
  }
  checkSlider();
};

//инициализация слайдера
const initialSlider = () => {
  createSlider(currentEffect);
  buttonEffectElement.addEventListener('change', onChangeEffect);
};

export { initialSlider, defaultEffect };
