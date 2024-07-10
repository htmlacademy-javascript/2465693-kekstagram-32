import { createIdGenerator, createRandomIdFromRangeGenerator, getRandomInteger } from './util.js';

const numberAvatar = {
  MIN: 1,
  MAX: 6,
};

const countsLikes = {
  MIN: 15,
  MAX: 30,
};

const countsComments = {
  MIN: 0,
  MAX: 30,
};

const countsMessage = {
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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateCommentId = createRandomIdFromRangeGenerator(1, MAX_COUNTS_ID_COMMENTS);

const createMessage = () => getRandomArrayElement(messageComments);

const createComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(numberAvatar.MIN, numberAvatar.MAX)}.svg`,
  message: Array.from({ length: getRandomInteger(countsMessage.MIN, countsMessage.MAX) }, createMessage),
  name: getRandomArrayElement(nameAuthorComments),
});

const generatePhotoId = createIdGenerator();

const createPhotoId = () => {
  const PhotoId = generatePhotoId();
  return {
    id: PhotoId,
    url: `photos/${PhotoId}.jpg`,
    description: descriptionPhotos[PhotoId - 1],
    likes: getRandomInteger(countsLikes.MIN, countsLikes.MAX),
    comments: Array.from({ length: getRandomInteger(countsComments.MIN, countsComments.MAX) }, createComments),
  };
};

export { createPhotoId };
