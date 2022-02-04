const MORSE_CODE_TABLE = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "0": "-----",
  " ": "/",
};

export function encodeMorse(string: string): string {
  const strippedString = string.toLowerCase().replace(/[^a-z0-9\s]/g, "");
  const characterArray = strippedString.split("");
  const morseCharacters = characterArray.map(
    (a: string) => (MORSE_CODE_TABLE as any)[a],
  );
  return morseCharacters.join(" ").replace("/ / /", "/");
}

export function decodeMorse(string: string): string {
  const strippedString = string.replace(/[a-zA-Z0-9]/g, "");
  const characterArray = strippedString.split(" ");
  const morseCharacters = characterArray.map(
    (a: string) => (objectFlip(MORSE_CODE_TABLE) as any)[a],
  );
  return morseCharacters.join("");
}

const objectFlip = <T extends { [key: string]: string }>(
  obj: T,
): { [key: string]: string } => {
  //swaps keys and values in a json object
  const ret: { [key: string]: string } = {};
  Object.keys(obj).forEach((key) => (ret[obj[key]] = key));
  return ret;
};
