import { TournamentUploadRecord } from "./TournamentUploadRecord";


export class TournamentResultsRecord extends TournamentUploadRecord {
    Id: number;
    TournamentId: number;
    BowlerId: number;
    IgnoreForAverage: boolean;

    ensureTypes() {
        super.ensureTypes();
        this.IgnoreForAverage = !!this.IgnoreForAverage;
        return this;
    }
}
