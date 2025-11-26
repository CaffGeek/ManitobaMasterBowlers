export class SeasonSummaryRecord {
    BowlerId: number;
    Bowler: string;
    Gender: string;
    
    Scratch1: number;
    Scratch2: number;
    Scratch3: number;
    Scratch4: number;
    Scratch5: number;
    Scratch6: number;
    POA1: number;
    POA2: number;
    POA3: number;
    POA4: number;
    POA5: number;
    POA6: number;
    
    ensureTypes() {
        const orUndefined = (x) => (Number.isNaN(Number.parseInt(`${x}`)) ? undefined : 1 * x);

        this.Scratch1 = orUndefined(this.Scratch1);
        this.Scratch2 = orUndefined(this.Scratch2);
        this.Scratch3 = orUndefined(this.Scratch3);
        this.Scratch4 = orUndefined(this.Scratch4);
        this.Scratch5 = orUndefined(this.Scratch5);
        this.Scratch6 = orUndefined(this.Scratch6);

        this.POA1 = orUndefined(this.POA1);
        this.POA2 = orUndefined(this.POA2);
        this.POA3 = orUndefined(this.POA3);
        this.POA4 = orUndefined(this.POA4);
        this.POA5 = orUndefined(this.POA5);
        this.POA6 = orUndefined(this.POA6);

        return this;
    }

    scratchArray() { return [
        this.Scratch1,
        this.Scratch2,
        this.Scratch3,
        this.Scratch4,
        this.Scratch5,
        this.Scratch6]
            .filter(x => x != undefined).sort((x, y) => y - x);
    }

    poaArray() { return [
        this.POA1,
        this.POA2,
        this.POA3,
        this.POA4,
        this.POA5,
        this.POA6]
            .filter(x => x != undefined)
            .sort((x, y) => y - x);
    }

    topNScratch(n: number) { return this.scratchArray().slice(0, Math.min(n, this.scratchArray().length)).reduce((x, y) => x + y, 0); }
    topNPoa(n: number) { return this.poaArray().slice(0, Math.min(n, this.poaArray().length)).reduce((x, y) => x + y, 0); }
}
