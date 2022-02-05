export const createPopMessage = (x: number, y: number): string => {
  let result = "";
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      result += "||POP||";
    }
    result += "\n";
  }

  return result;
};
