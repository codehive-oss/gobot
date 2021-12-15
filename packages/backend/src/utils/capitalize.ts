// capitalize only the first letter of the string.
export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// capitalize all words of a string.
export const capitalizeWords = (sentence: string) => {
  return sentence.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};
