import { bookings } from "./bookings.ts";
import { bookSession } from "./bookSession.ts";
import { checkInAtDesk } from "./checkInAtDesk.ts";
import { members } from "./members.ts";
import { sessions } from "./sessions.ts";

beforeEach(() => {
  members.reset([
    { id: "m1", name: "Lina", email: "lina@verticale.fr", student: true },
    { id: "m2", name: "Théo", email: "theo@verticale.fr", student: false },
  ]);
  sessions.reset([
    { id: "s1", startsAt: "2026-10-01T18:00:00Z", seatsLeft: 12 },
  ]);
  bookings.reset([]);
});

test("The desk charges a student the same as the website", async () => {
    const desk = await checkInAtDesk("m1", "s1");
    const online = await bookSession("m1", "s1");

    expect(desk).toEqual(online);
})

test("the desk charges an ordianry member the same as the website", async () => {
    const desk = await checkInAtDesk("m2", "s1");
    const online = await bookSession("m2", "s1");

    expect(desk).toEqual(online);
})