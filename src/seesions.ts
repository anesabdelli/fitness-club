export interface Session {
    id: string;
    startsAt: string;
    seatsLeft: number;
}

let rows: Session[] = []; 

export const sessions = {
    reset(seed: Session[]): void {
        rows = seed.map((session) => ({ ...session })); 
    },

    async byId(id: string): Promise<Session | undefined> {
        return rows.find((session) => session.id === id);
    },

    async save(session: Session): Promise<void> {
        rows = rows.map((row) => (row.id === session.id ? { ...session } : row));
    },
}