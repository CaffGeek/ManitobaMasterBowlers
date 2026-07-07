import { TournamentUploadRecord } from "./TournamentUploadRecord";


export class TournamentResultsRecord extends TournamentUploadRecord {
    Id: number;
    TournamentId: number;
    BowlerId: number;
    EffectiveBowlerId?: number;
    EffectiveBowler?: string;
    EffectiveGender?: string;
    IgnoreForAverage: boolean;
    WonStars: boolean;

    ensureTypes() {
        super.ensureTypes();
        this.IgnoreForAverage = !!this.IgnoreForAverage;
        this.WonStars = !!this.WonStars;
        return this;
    }
}
