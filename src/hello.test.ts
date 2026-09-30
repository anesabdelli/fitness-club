import { greet } from "./hello.ts";

test("greet says hello anes", () => {
  expect(greet()).toBe("Hello, Anes!");
});