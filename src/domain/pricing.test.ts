import { priceOf } from "./pricing.ts";

const at = (hour: string) => new Date(`2026-10-01T${hour}:00Z`);

test("a session costs 12 EUR", () => {
  expect(priceOf({ student: false }, at("18"))).toBe(1200);
});

test("a student pays 9 EUR", () => {
  expect(priceOf({ student: true }, at("18"))).toBe(900);
});

test("before 17:00 a session is 3 EUR cheaper", () => {
  expect(priceOf({ student: false }, at("16"))).toBe(900);
});

test("a student before 17:00 pays 6 EUR", () => {
  expect(priceOf({ student: true }, at("16"))).toBe(600);
});

test("17:00 sharp is already peak hour", () => {
  expect(priceOf({ student: false }, at("17"))).toBe(1200);
});
