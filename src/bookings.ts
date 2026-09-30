export interface Booking{
    id: string;
    memberId: string;
    sessionId: string;
    priceCents: number;
}

let rows: Booking[] = [];

export const bookings = {
    reset(seed: Booking[]): void {
        rows = seed.map((booking) => ({...booking}))
    },

    async add(booking: Booking): Promise<void> {
        rows = [...rows, booking];
    },

    async all(): Promise<Booking[]> {
        return [...rows];
    }
}