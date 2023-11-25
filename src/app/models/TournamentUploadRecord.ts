export class TournamentUploadRecord {
    Bowler: string;
    Game1: number;
    Game2: number;
    Game3: number;
    Game4: number;
    Game5: number;
    Game6: number;
    Game7: number;
    Game8: number;
    Average: number;
    Gender: string;
    NewBowler: boolean;
    
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
        this.Average = orZero(this.Average);
        return this;
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

    poa() { return 0 +
        ((!!this.Game1 || this.Game1 > 0) ? (this.Game1 - this.Average) : 0) + 
        ((!!this.Game2 || this.Game2 > 0) ? (this.Game2 - this.Average) : 0) +
        ((!!this.Game3 || this.Game3 > 0) ? (this.Game3 - this.Average) : 0) +
        ((!!this.Game4 || this.Game4 > 0) ? (this.Game4 - this.Average) : 0) +
        ((!!this.Game5 || this.Game5 > 0) ? (this.Game5 - this.Average) : 0) +
        ((!!this.Game6 || this.Game6 > 0) ? (this.Game6 - this.Average) : 0) +
        ((!!this.Game7 || this.Game7 > 0) ? (this.Game7 - this.Average) : 0) +
        ((!!this.Game8 || this.Game8 > 0) ? (this.Game8 - this.Average) : 0);
    }
}