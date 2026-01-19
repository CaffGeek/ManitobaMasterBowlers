import moment from "moment";
import { Division } from "./types/Division";

export class BowlerResultsRecord {
    BowlerAverage: number;
    BowlerId: number;
    Division: Division;
    Game1: number;
    Game2: number;
    Game3: number;
    Game4: number;
    Game5: number;
    Game6: number;
    Game7: number;
    Game8: number;
    SeasonCode: number;
    TournamentDetails: string;
    TournamentId: number;
    TournamentLocation: string;
    TournamentNumber: number;
    IgnoreForAverage: boolean;
    WonStars: boolean;
    
    ensureTypes() {
        const orZero = (x) => 1 * (Number.isNaN(Number.parseInt(`${x}`)) ? 0 : x);
        this.Game1 = orZero(this.Game1);
        this.Game2 = orZero(this.Game2);
        this.Game3 = orZero(this.Game3);
        this.Game4 = orZero(this.Game4);
        this.Game5 = orZero(this.Game5);
        this.Game6 = orZero(this.Game6);
        this.Game7 = orZero(this.Game7);
        this.Game8 = orZero(this.Game8);
        this.BowlerAverage = orZero(this.BowlerAverage);
        this.IgnoreForAverage = !!this.IgnoreForAverage;
        this.WonStars = !!this.WonStars;
        return this;
    }

    date() {
        return moment(this.TournamentDetails, ['DDMMMMY', 'MMMMDDY']).toDate()
    }

    scratch() { return 0 + 
        this.Game1 + 
        this.Game2 +
        this.Game3 +
        this.Game4 +
        this.Game5 +
        this.Game6 +
        this.Game7 +
        this.Game8;
    };

    poa() { return (!this.BowlerAverage || this.BowlerAverage === 450)
        ? undefined
        : 0 +
        ((!!this.Game1 || this.Game1 > 0) ? (this.Game1 - this.BowlerAverage) : 0) + 
        ((!!this.Game2 || this.Game2 > 0) ? (this.Game2 - this.BowlerAverage) : 0) +
        ((!!this.Game3 || this.Game3 > 0) ? (this.Game3 - this.BowlerAverage) : 0) +
        ((!!this.Game4 || this.Game4 > 0) ? (this.Game4 - this.BowlerAverage) : 0) +
        ((!!this.Game5 || this.Game5 > 0) ? (this.Game5 - this.BowlerAverage) : 0) +
        ((!!this.Game6 || this.Game6 > 0) ? (this.Game6 - this.BowlerAverage) : 0) +
        ((!!this.Game7 || this.Game7 > 0) ? (this.Game7 - this.BowlerAverage) : 0) +
        ((!!this.Game8 || this.Game8 > 0) ? (this.Game8 - this.BowlerAverage) : 0);
    }
}
