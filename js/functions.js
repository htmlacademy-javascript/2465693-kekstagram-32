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
  for (let i = cleanString.length - 1; i >= 0; i--){
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

function extractNumber (string) {
  let number = '';
  string = string.toString();
  for (let i = 0; i <= string.length - 1; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      number += string[i];
    }
  }
  return(parseInt(number, 10));
}

extractNumber('2023 год'); // 2023
extractNumber('ECMAScript 2022'); // 2022
extractNumber('1 кефир, 0.5 батона'); // 105
extractNumber('агент 007'); // 7
extractNumber('а я томат'); // NaN

//случай, когда вместо строки приходит число.

extractNumber(2023); // 2023
extractNumber(-1); // 1
extractNumber(1.5); // 15
