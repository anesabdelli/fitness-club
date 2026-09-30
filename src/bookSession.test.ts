import { bookings } from "./bookings.ts";
import { bookSession } from "./bookSession.ts";
import { members } from "./members.ts";
import { sessions } from "./sessions.ts";

beforeEach(() => {
  members.reset([
    { id: "m1", name: "Anes", email: "anes@esiee-it.fr", student: true },
    { id: "m2", name: "Theo", email: "Theo@esiee-it.fr", student: false },
  ]);

  sessions.reset([
    { id: "s1", startsAt: "2026-10-01T18:00:00Z", seatsLeft: 12 },
    { id: "s2", startsAt: "2026-10-01T20:00:00Z", seatsLeft: 0 },
  ]);

  bookings.reset([]);
});

test("A member pays 12 EUR for each session", async () => {
  const { priceCents } = await bookSession("m2", "s1");
  expect(priceCents).toBe(1200);
});

test("A student pays 9 EUR for the same session", async () => {
  const { priceCents } = await bookSession("m1", "s1");
  expect(priceCents).toBe(900);
});

test("a full session is refused", async () => {
  await expect(bookSession("m1", "s2")).rejects.toThrow(/full/);
});

test("booking takes a seat", async () => {
  await bookSession("m1", "s1");
  expect((await sessions.byId("s1"))?.seatsLeft).toBe(11);
});