import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import config from '../../../auth_config.json';
import { BowlerRecord } from '@models/BowlerRecord';
import { SeasonRecord } from '@models/SeasonRecord';
import { TournamentRecord } from '@models/TournamentRecord';
import { TournamentResultsRecord } from '@models/TournamentResultsRecord';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // TODO: CHAD: Add Caching
  // https://dev.to/this-is-angular/how-caching-data-in-angular-with-rxjs-27mj
  // https://blog.logrocket.com/caching-with-httpinterceptor-in-angular/

  seasons$(): Observable<SeasonRecord[]> {
    return this.http.get(`${config.apiUri}/seasons`) as Observable<SeasonRecord[]>;
  }

  bowlers$(): Observable<BowlerRecord[]> {
    return this.http.get(`${config.apiUri}/bowlers`) as Observable<BowlerRecord[]>;
  }

  tournaments$(): Observable<TournamentRecord[]> {
    return this.http.get(`${config.apiUri}/tournaments`) as Observable<TournamentRecord[]>;
  }

  tournamentResults$(id: number): Observable<TournamentResultsRecord[]> {
    if (!id) return of([]);
    return this.http.get(`${config.apiUri}/tournamentresults/${id}`) as Observable<TournamentResultsRecord[]>;
  }
}
