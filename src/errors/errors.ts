export class RosterError extends Error {
    constructor(readonly code: number, readonly message: string) {
        super(message);
    }
}