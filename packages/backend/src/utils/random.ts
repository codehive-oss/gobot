export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomChoice(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randString(length: number) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
