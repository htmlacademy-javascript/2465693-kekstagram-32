//1 Задание: проверка длины строк

const checkLengthString = (string, lengthString) => string.length <= lengthString;

// Строка короче 20 символов
checkLengthString('проверяемая строка', 20); // true

// Длина строки ровно 18 символов
checkLengthString('проверяемая строка', 18); // true

// Строка длиннее 10 символов
checkLengthString('проверяемая строка', 10); // false

//2 Задание: проверка на палиндром

const checkPalindrom = (string) => {
  const cleanString = string.replaceAll(' ', '').toLowerCase('');
  let reverseString = '';
  for (let i = cleanString.length - 1; i >= 0; i--) {
    reverseString += cleanString[i];
  }
  return reverseString === cleanString;
};

// Строка является палиндромом
checkPalindrom('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkPalindrom('ДовОд'); // true
// Это не палиндром
checkPalindrom('Кекс'); // false

//3 дополнительное задание: извлечение чисел

function extractNumber(string) {
  let number = '';
  string = string.toString();
  for (let i = 0; i <= string.length - 1; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      number += string[i];
    }
  }
  return parseInt(number, 10);
}

extractNumber('2023 год'); // 2023
extractNumber('ECMAScript 2022'); // 2022
extractNumber('1 кефир, 0.5 батона'); // 105
extractNumber('агент 007'); // 7
extractNumber('а я томат'); // NaN

//тот случай, когда вместо строки приходит число.

extractNumber(2023); // 2023
extractNumber(-1); // 1
extractNumber(1.5); // 15

//Практическое зхадание №5

const dayStart = '08:0';
const dayEnd = '17:30';
const startMeeting = '08:00';
const duration = '90';

const getMinutes = (time) => {
  const result = time.split(':');
  const resultInteger = [];
  let minutes = 0;
  for (let i = 0; i <= result.length - 1; i++) {
    resultInteger[i] = parseInt(result[i], 10);
  }
  if (resultInteger[1] === 0) {
    minutes = resultInteger[0] * 60;
  } else {
    minutes = resultInteger[0] * 60 + resultInteger[1];
  }
  return minutes;
};

const planer = (start, end, meeting, durat) => {
  const durationMeeting = getMinutes(end) - getMinutes(meeting) - parseInt(durat, 10);
  const meetingEarlier = getMinutes(meeting) - getMinutes(start);
  if (durationMeeting > 0 || meetingEarlier > 0) {
    return true;
  } else {
    return false;
  }
};

// eslint-disable-next-line no-console
console.log(planer(dayStart, dayEnd, startMeeting, duration));
