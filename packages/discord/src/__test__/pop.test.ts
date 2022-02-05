import { createPopMessage } from "../utils/createPopMessage";

test("create a single pop message", () => {
  expect(createPopMessage(1, 1)).toBe("||POP||\n");
});
