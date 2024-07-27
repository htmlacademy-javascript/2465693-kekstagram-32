//объявления для эффекта
const form = document.querySelector('.img-upload__form');
const effectValueElement = form.querySelector('.effect-level__value');
const sliderElement = form.querySelector('.effect-level__slider');
const pattern = {
  Min: 0,
  Max: 100,
  Step: 1,
};

//отображает слайдер на форме
const createSlider = ({ Min, Max, Step }) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: Min,
      max: Max,
    },
    start: Max - 50,
    step: Step,
    connect: 'lower',
  });
};

console.log(pattern;)

// sliderElement.noUiSlider.on('update', () => {
//   //effectValueElement.value = sliderElement.noUiSlider.get();
//   console.log('change');
// });

//инициализация слайдера
const initialSlider = () => {
  createSlider(pattern);
};

export { initialSlider };
