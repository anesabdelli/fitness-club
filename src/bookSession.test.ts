import { beforeEach, expect, test } from "@jest/globals";
import { bookSession } from "./bookSession.ts";
import { bookings } from "./bookings.ts";
import { members } from "./members.ts";
import { sessions } from "./sessions.ts";

/** Fake clock for deterministic tests */
const clockAt = (hour: string) => ({
  now: () => new Date(`2026-10-01T${hour}:00Z`),
});

beforeEach(() => {
  members.reset([
    { id: "m1", name: "Lina", email: "lina@verticale.fr", student: true },
    { id: "m2", name: "Théo", email: "theo@verticale.fr", student: false },
  ]);

  sessions.reset([
    { id: "s1", startsAt: "2026-10-01T18:00:00Z", seatsLeft: 12 },
    { id: "s2", startsAt: "2026-10-01T20:00:00Z", seatsLeft: 0 },
  ]);

  bookings.reset([]);
});

test("a member booking in the evening pays 12 EUR", async () => {
  const { priceCents } = await bookSession("m2", "s1", clockAt("18"));
  expect(priceCents).toBe(1200);
});

test("a member booking in the afternoon pays 9 EUR", async () => {
  const { priceCents } = await bookSession("m2", "s1", clockAt("16"));
  expect(priceCents).toBe(900);
});

test("a student booking in the afternoon pays 6 EUR", async () => {
  const { priceCents } = await bookSession("m1", "s1", clockAt("16"));
  expect(priceCents).toBe(600);
});

test("a full session is refused", async () => {
  await expect(bookSession("m1", "s2", clockAt("18"))).rejects.toThrow(/full/);
});

test("booking takes a seat", async () => {
  await bookSession("m1", "s1", clockAt("18"));
  expect((await sessions.byId("s1"))?.seatsLeft).toBe(11);
});