/**
 * The function takes a string as input and returns the same string with the first letter
 * capitalized.
 *
 * @param {string} value - A string that you want to capitalize.
 *
 * @returns a string with the first letter capitalized.
 */
export const capitalize = (value: string) => {
  const firstLetter = value.charAt(0);
  const firstUpperLetter = firstLetter.toUpperCase();

  const restLetters = value.substring(1);

  return firstUpperLetter + restLetters;
};
