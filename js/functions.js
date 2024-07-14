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

const getMinutes = (time) => {
  const hours = parseInt(time.split(':')[0], 10);
  const minutes = parseInt(time.split(':')[1], 10);
  const minutesInHours = 60;

  return hours * minutesInHours + minutes;
};

const planer = (start, end, meeting, durat) => {
  if (getMinutes(meeting) < getMinutes(start) || getMinutes(meeting) + parseInt(durat, 10) > getMinutes(end)) {
    return false;
  } else {
    return true;
  }
};

// // eslint-disable-next-line no-console
// console.log(planer('08:00', '17:30', '14:00', 90)); // true
// // eslint-disable-next-line no-console
// console.log(planer('8:0', '10:0', '8:0', 120)); // true
// // eslint-disable-next-line no-console
// console.log(planer('08:00', '14:30', '14:00', 90)); // false
// // eslint-disable-next-line no-console
// console.log(planer('14:00', '17:30', '08:0', 90)); // false
// eslint-disable-next-line no-console
console.log(planer('8:00', '17:30', '08:00', 900)); // false
