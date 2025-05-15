export const generateStrongPassword = (length = 12): string => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  const allChars = lowercaseChars + uppercaseChars + numbers;

  let password =
    lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)] +
    uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)] +
    numbers[Math.floor(Math.random() * numbers.length)];

  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');
};
