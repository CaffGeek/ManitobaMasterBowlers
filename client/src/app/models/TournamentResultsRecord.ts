import { TournamentUploadRecord } from "./TournamentUploadRecord";


export class TournamentResultsRecord extends TournamentUploadRecord {
    Id: number;
    TournamentId: number;
    BowlerId: number;
    EffectiveBowlerId?: number;
    EffectiveBowler?: string;
    EffectiveGender?: string;
    IsEligibleForDivision: boolean;
    IgnoreForAverage: boolean;
    WonStars: boolean;

    ensureTypes() {
        super.ensureTypes();
        this.IsEligibleForDivision = !!this.IsEligibleForDivision;
        this.IgnoreForAverage = !!this.IgnoreForAverage;
        this.WonStars = !!this.WonStars;
        return this;
    }
}
