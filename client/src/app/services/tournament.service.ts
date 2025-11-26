import { Injectable } from '@angular/core';
import { TournamentUploadRecord } from '@models/TournamentUploadRecord';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor() { }

  parseUpload(tsv): TournamentUploadRecord[] {
    let lines = tsv.split(/\r?\n/);
    
    return lines
      .map(line => /(?<Bowler>[a-zA-Z \-\.]+)\s+(?<Game1>\d{0,3})?\s*(?<Game2>\d{0,3})?\s*(?<Game3>\d{0,3})?\s*(?<Game4>\d{0,3})?\s*(?<Game5>\d{0,3})?\s*(?<Game6>\d{0,3})?\s*(?<Game7>\d{0,3})?\s*(?<Game8>\d{0,3})?\s*(?<Average>\d{0,3})?/.exec(line))
      .reduce((a, c) => a ? [...a, c.groups] : [c.groups], [])
      .map(x => Object.assign(new TournamentUploadRecord(), x).ensureTypes());
  };
}
