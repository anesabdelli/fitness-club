export interface Member {
    id: string;
    name: string;
    email: string;
    student: boolean;
}

let rows: Member[] = []

export const members = {
    reset(seed: Member[]): void {
        rows = seed.map((member) => ({...member}));
    },

    async byId(id: string): Promise<Member | undefined> {
        return rows.find((member) => member.id === id);
    },

    async all(): Promise<Member[]>{
        return [...rows];
    },
}