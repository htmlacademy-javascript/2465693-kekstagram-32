const NUMBERS_OF_PHOTOS = 25;
const NUMBER_AVATAR = {
  MIN: 1,
  MAX: 6,
};

const COUNTS_LIKES = {
  MIN: 15,
  MAX: 30,
};

const MAX_COUNTS_COMMENTS = 300;
const MAX_COUNTS_ID_COMMENTS = 500;

const descriptionPhotos = [
  'Галерея пляжа Мулини',
  'сходи на пляж',
  'пляж карибского моря',
  'девушка с фотоаппаратом',
  'блюдо от шефа',
  'черный Макларен',
  'десерт',
  'освежающий фреш',
  'самолет над пляжем',
  'органайзер хранения обуви',
  'дорога к морю',
  'Audi RS5',
  'нарезка лосося',
  'Кексорол',
  'теплые тапочки',
  'пролетая над горами',
  'на концерте',
  'Шевроле Импала 1964 года выпуска',
  'тапочки с подсветкой',
  'фото вечернего отеля',
  'Као пад с курицей ',
  'закат на море',
  'Мангровый краб',
  'на рок концерте',
  'сафари экскурсия',
];

const nameAuthorComments = [
  'Николай',
  'Ирина',
  'Джек',
  'Келли',
  'Остап',
  'Серафима',
  'Виктор',
  'Елена',
  'Иван',
  'Ольга',
  'Неопознаный Енот',
];

const messageComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateCommentId = createRandomIdFromRangeGenerator(1, MAX_COUNTS_ID_COMMENTS);

const createComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(NUMBER_AVATAR.MIN, NUMBER_AVATAR.MAX)}.svg`,
  message: getRandomArrayElement(messageComments),
  name: getRandomArrayElement(nameAuthorComments),
});

const createArrayComments = () => {
  const lastArrayComments = [];

  for (let i = 0; i < getRandomInteger(0, MAX_COUNTS_COMMENTS); i++) {
    const comments = createComments();
    lastArrayComments.push(comments);
  }

  return lastArrayComments;
};

const generateArrayComments = createArrayComments;

const generatePhotoId = createRandomIdFromRangeGenerator(1, NUMBERS_OF_PHOTOS);

const createPhotoId = () => {
  const photoId = generatePhotoId();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: descriptionPhotos[photoId - 1],
    likes: getRandomInteger(COUNTS_LIKES.MIN, COUNTS_LIKES.MAX),
    comments: generateArrayComments(),
  };
};

const createArrayPhotos = Array.from({ length: NUMBERS_OF_PHOTOS }, createPhotoId);

// eslint-disable-next-line no-console
console.log(createArrayPhotos);
