import { bookings } from "./bookings.ts";
import { members } from "./members.ts";
import { sessions } from "./sessions.ts";

export async function bookSession(memberId: string, sessionId: string): Promise<{priceCents: number}> {
    const member = await members.byId(memberId);
    const session = await sessions.byId(sessionId);
    if(!member || !session) throw new Error("unknown member or session");

    if(session.seatsLeft <= 0) throw new Error("session is full");

    const priceCents = member.student? 900: 1200;

    await bookings.add({id: `${memberId}-${sessionId}`, memberId, sessionId, priceCents});
    await sessions.save({...session, seatsLeft: session.seatsLeft - 1});
    return { priceCents };
}