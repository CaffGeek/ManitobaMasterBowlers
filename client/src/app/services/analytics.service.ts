import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, startWith } from 'rxjs';
import { environment } from '../../environments/environment';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private initialized = false;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  initialize(): void {
    if (this.initialized) return;
    this.initialized = true;

    const measurementId = (environment.googleAnalyticsMeasurementId || '').trim();
    if (!environment.production || !/^G-[A-Z0-9]+$/i.test(measurementId)) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (..._args: unknown[]): void {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: false });

    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset['mbamAnalytics'] = 'true';
    this.document.head.appendChild(script);

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => this.publicPath(event.urlAfterRedirects)),
      startWith(this.publicPath(this.router.url)),
      distinctUntilChanged()
    ).subscribe((pagePath) => {
      window.gtag?.('event', 'page_view', {
        page_path: pagePath,
        page_location: `${window.location.origin}${pagePath}`,
        page_title: this.document.title,
      });
    });
  }

  private publicPath(url: string): string {
    const path = (url || '/').split('?')[0].split('#')[0];
    return path || '/';
  }
}
