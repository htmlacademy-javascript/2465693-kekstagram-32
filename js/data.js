const NUMBER_AVATAR = {
  MIN: 1,
  MAX: 6,
};

const COUNTS_LIKES = {
  MIN: 15,
  MAX: 30,
};

const COUNTS_COMMENTS = {
  MIN: 0,
  MAX: 30,
};

const COUNTS_MESSAGE = {
  MIN: 1,
  MAX: 2,
};

const MAX_COUNTS_ID_COMMENTS = 750;

const messageComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

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

import { getRandomInteger } from './util.js';
import { createRandomIdFromRangeGenerator } from './util.js';

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateCommentId = createRandomIdFromRangeGenerator(1, MAX_COUNTS_ID_COMMENTS);

const createMessage = () => getRandomArrayElement(messageComments);

const createComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(NUMBER_AVATAR.MIN, NUMBER_AVATAR.MAX)}.svg`,
  message: Array.from({ length: getRandomInteger(COUNTS_MESSAGE.MIN, COUNTS_MESSAGE.MAX) }, createMessage),
  name: getRandomArrayElement(nameAuthorComments),
});

const createPhotoId = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: descriptionPhotos[index - 1],
  likes: getRandomInteger(COUNTS_LIKES.MIN, COUNTS_LIKES.MAX),
  comments: Array.from({ length: getRandomInteger(COUNTS_COMMENTS.MIN, COUNTS_COMMENTS.MAX) }, createComments),
});

export { createPhotoId };
