import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from '../../../auth_config.json';
import { BowlerRecord } from '@models/BowlerRecord';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // TODO: CHAD: Add Caching
  // https://dev.to/this-is-angular/how-caching-data-in-angular-with-rxjs-27mj
  // https://blog.logrocket.com/caching-with-httpinterceptor-in-angular/

  bowlers$(): Observable<BowlerRecord[]> {
    return this.http.get(`${config.apiUri}/bowlers`) as Observable<BowlerRecord[]>;
  }
}
