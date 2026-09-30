import { bookings } from "./bookings.ts";
import { Clock } from "./domain/clock.ts";
import { priceOf } from "./domain/pricing.ts";
import { members } from "./members.ts";
import { sessions } from "./sessions.ts";

export async function checkInAtDesk(memberId: string, sessionId: string, clock: Clock): Promise<{ priceCents: number }> {
  const member = await members.byId(memberId);
  const session = await sessions.byId(sessionId);
  if (!member || !session) throw new Error("unknown member or session");

  if (session.seatsLeft <= 0) throw new Error("session is full");

  const priceCents = priceOf(member, clock.now());

  await bookings.add({id: `${memberId}-${sessionId}`, memberId, sessionId, priceCents});
  await sessions.save({ ...session, seatsLeft: session.seatsLeft - 1});
  return { priceCents };
}
