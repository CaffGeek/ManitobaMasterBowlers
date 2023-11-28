import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, mergeAll, of, shareReplay, tap } from 'rxjs';
import { BowlerRecord } from '@models/BowlerRecord';
import { SeasonRecord } from '@models/SeasonRecord';
import { TournamentRecord } from '@models/TournamentRecord';
import { TournamentResultsRecord } from '@models/TournamentResultsRecord';
import config from '../../../auth_config.json';
import { BowlerResultsRecord } from '@models/BowlerResultsRecord';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  
  private cache = {};
  private fromCache = <T>(route: string): Observable<T> => {
    return (this.cache?.[route])
      ? this.cache[route]
      : this.cache[route] = this.http.get(`${config.apiUri}/${route}`).pipe(shareReplay(1)) as Observable<T>;
  }

  private clearCache = (route: string) => {
    if (!route) this.cache = {};
    if (route && this.cache?.[route]) this.cache[route] = undefined;
  }

  seasons$(): Observable<SeasonRecord[]> {
    return this.fromCache<SeasonRecord[]>('seasons')
    .pipe(map(z => z.map(x => Object.assign(new SeasonRecord(), x))));
  }

  bowlers$(): Observable<BowlerRecord[]> {
    return this.fromCache<BowlerRecord[]>('bowlers')
      .pipe(map(z => z.map(x => Object.assign(new BowlerRecord(), x))));
  }

  bowlerResults$(id: number): Observable<BowlerResultsRecord[]> {
    if (!id) return of([]);

    return this.fromCache<BowlerResultsRecord[]>(`bowlerresults/${id}`)
      .pipe(map(z => z.map(x => Object.assign(new BowlerResultsRecord(), x).ensureTypes())));
  }

  tournaments$(): Observable<TournamentRecord[]> {
    return this.fromCache<TournamentRecord[]>('tournaments')
      .pipe(map(z => z.map(x => Object.assign(new TournamentRecord(), x))));
  }

  tournamentResults$(id: number): Observable<TournamentResultsRecord[]> {
    if (!id) return of([]);
    
    return this.fromCache<TournamentResultsRecord[]>(`tournamentresults/${id}`)
      .pipe(map(z => z.map(x => Object.assign(new TournamentResultsRecord(), x).ensureTypes())));
  }

  whoami() {
    return this.http.get(`${config.apiUri}/whoami`);
  }
}
