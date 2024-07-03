const NUMBERS_OF_PHOTOS = 25;
const MIN_NUMBER_AVATAR = 1;
const MAX_NUMBER_AVATAR = 6;
const MIN_COUNTS_LIKES = 15;
const MAX_COUNTS_LIKES = 300;
const MAX_COUNTS_COMMENTS = 30;
const MAX_COUNTS_ID_COMMENTS = 500;

const descriptionPhoto = [
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

function createIdGenerator() {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const generateCommentId = createRandomIdFromRangeGenerator(
  1,
  MAX_COUNTS_ID_COMMENTS
);

function createComments() {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(
      MIN_NUMBER_AVATAR,
      MAX_NUMBER_AVATAR
    )}.svg`,
    message: getRandomArrayElement(messageComments),
    name: getRandomArrayElement(nameAuthorComments),
  };
}

function createArrayComments() {
  let lastArrayComments = [];

  return function () {
    lastArrayComments = Array.from(
      { length: getRandomInteger(0, MAX_COUNTS_COMMENTS) },
      createComments
    );
    return lastArrayComments;
  };
}

const generateArrayComments = createArrayComments();

const generatePhotoId = createIdGenerator();

function createPhotoId() {
  const photoId = generatePhotoId();
  const currentArraycomments = generateArrayComments();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: descriptionPhoto[photoId - 1],
    likes: getRandomInteger(MIN_COUNTS_LIKES, MAX_COUNTS_LIKES),
    comments: currentArraycomments,
  };
}

const createArrayPhotos = Array.from(
  { length: NUMBERS_OF_PHOTOS },
  createPhotoId
);

// eslint-disable-next-line no-console
console.log(createArrayPhotos);
