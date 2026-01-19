import { TournamentUploadRecord } from "./TournamentUploadRecord";


export class TournamentResultsRecord extends TournamentUploadRecord {
    Id: number;
    TournamentId: number;
    BowlerId: number;
    IgnoreForAverage: boolean;
    WonStars: boolean;

    ensureTypes() {
        super.ensureTypes();
        this.IgnoreForAverage = !!this.IgnoreForAverage;
        this.WonStars = !!this.WonStars;
        return this;
    }
}
