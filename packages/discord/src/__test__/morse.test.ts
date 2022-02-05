import { decodeMorse } from "../utils/morse";
import { encodeMorse } from "../utils/morse";

test("encode morse", () => {
  expect(encodeMorse("a")).toBe(".-");
});

test("decode morse", () => {
  expect(decodeMorse(".-")).toBe("a");
});
