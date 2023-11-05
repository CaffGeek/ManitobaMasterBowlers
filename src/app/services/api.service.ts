import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay } from 'rxjs';
import { BowlerRecord } from '@models/BowlerRecord';
import { SeasonRecord } from '@models/SeasonRecord';
import { TournamentRecord } from '@models/TournamentRecord';
import { TournamentResultsRecord } from '@models/TournamentResultsRecord';
import config from '../../../auth_config.json';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  
  private cache = {};
  private fromCache = (route: string) => {
    return (this.cache?.[route])
      ? this.cache[route]
      : this.cache[route] = this.http.get(`${config.apiUri}/${route}`).pipe(shareReplay(1)) as Observable<BowlerRecord[]>;
  }
  private clearCache = (route: string) => {
    if (!route) this.cache = {};
    if (route && this.cache?.[route]) this.cache[route] = undefined;
  }

  seasons$(): Observable<SeasonRecord[]> {
    return this.fromCache('seasons');
  }

  bowlers$(): Observable<BowlerRecord[]> {
    return this.fromCache('bowlers');
  }

  bowlerResults$(id: number): Observable<any[]> { //TODO: CHAD: Missing type
    return this.fromCache(`bowlerresults/${id}`);
  }

  tournaments$(): Observable<TournamentRecord[]> {
    return this.fromCache('tournaments');
  }

  tournamentResults$(id: number): Observable<TournamentResultsRecord[]> {
    if (!id) return of([]);
    
    return this.fromCache(`tournamentresults/${id}`);
  }

  whoami() {
    return this.http.get(`${config.apiUri}/whoami`);
  }
}
