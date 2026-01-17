import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, shareReplay, tap } from 'rxjs';
import { environment } from '../../environments/environment';

import { BowlerRecord } from '@models/BowlerRecord';
import { ContentBlockRecord } from '@models/ContentBlockRecord';
import { SeasonRecord } from '@models/SeasonRecord';
import { TournamentRecord } from '@models/TournamentRecord';
import { TournamentResultsRecord } from '@models/TournamentResultsRecord';
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
      : this.cache[route] = this.http.get(`${environment.apiUri}${route}`).pipe(shareReplay(1)) as Observable<T>;
  }

  private clearCache = (route: string) => {
    if (!route) this.cache = {};
    if (route && this.cache?.[route]) this.cache[route] = undefined;
  }

  contentBlocks$(key: string = ""): Observable<ContentBlockRecord[]> {
    return this.fromCache<ContentBlockRecord[]>(`contentblocks/${key}`)
      .pipe(map(z => z.map(x => Object.assign(new ContentBlockRecord(), x))));
  }

  seasons$(): Observable<SeasonRecord[]> {
    return this.fromCache<SeasonRecord[]>('seasons')
    .pipe(map(z => z.map(x => Object.assign(new SeasonRecord(), x))));
  }

  bowlers$(): Observable<BowlerRecord[]> {
    return this.fromCache<BowlerRecord[]>('bowlers')
      .pipe(map(z => z.map(x => Object.assign(new BowlerRecord(), x))));
  }

  bowlerResults$(bowlerId: number): Observable<BowlerResultsRecord[]> {
    if (!bowlerId) return of([]);

    return this.fromCache<BowlerResultsRecord[]>(`bowlerresults/${bowlerId}`)
      .pipe(map(z => z.map(x => Object.assign(new BowlerResultsRecord(), x).ensureTypes())));
  }

  tournaments$(): Observable<TournamentRecord[]> {
    return this.fromCache<TournamentRecord[]>('tournaments')
      .pipe(map(z => z.map(x => Object.assign(new TournamentRecord(), x))));
  }

  tournamentResults$(tournamentId: number): Observable<TournamentResultsRecord[]> {
    if (!tournamentId) return of([]);
    
    return this.fromCache<TournamentResultsRecord[]>(`tournamentresults/${tournamentId}`)
      .pipe(map(z => z.map(x => Object.assign(new TournamentResultsRecord(), x).ensureTypes())));
  }

  saveTournamentResults(tournamentId: number, results) {
    return this.http.put(`${environment.apiUri}tournamentresults/${tournamentId}`, results)
      .subscribe(() => this.clearCache(`tournamentresults/${tournamentId}`));
  }

  saveContentBlock(key: string, contentHtml: string): Observable<unknown> {
    return this.http.post(`${environment.apiUri}contentblocks/save`, { contentBlock: key, contentHTML: contentHtml })
      .pipe(tap(() => this.clearCache(`contentblocks/${key}`)));
  }

  whoami() {
    return this.http.get(`${environment.apiUri}whoami`);
  }
}
