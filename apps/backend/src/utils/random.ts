export const randInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const randomChoice = <T>(arr: T[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const randString = (length: number) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
