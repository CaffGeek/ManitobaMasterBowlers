import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, catchError, distinctUntilChanged, filter, map, of, startWith, switchMap } from 'rxjs';
import { SponsorAdRecord } from '@models/SponsorRecord';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class SponsorAdvertisingService {
  private readonly adsSubject = new BehaviorSubject<SponsorAdRecord[]>([]);
  readonly ads$ = this.adsSubject.asObservable();

  constructor(private router: Router, private api: ApiService) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
      distinctUntilChanged(),
      switchMap((path) => this.api.sponsorAds$(path).pipe(catchError(() => of([]))))
    ).subscribe((ads) => this.adsSubject.next(ads || []));
  }
}
