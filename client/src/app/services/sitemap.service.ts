import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, shareReplay, tap } from 'rxjs';
import { ApiService } from '@services/api.service';
import { SitemapPageRecord } from '@models/SitemapPageRecord';

interface SitemapPayload {
  pages: SitemapPageRecord[];
}

const SITEMAP_KEY = '_sitemap';

@Injectable({
  providedIn: 'root',
})
export class SitemapService {
  private sitemap$?: Observable<SitemapPayload>;

  constructor(private api: ApiService) {}

  loadSitemap$(): Observable<SitemapPayload> {
    if (!this.sitemap$) {
      this.sitemap$ = this.api.contentBlocks$(SITEMAP_KEY).pipe(
        map((blocks) => {
          const latest = blocks.slice(-1)[0];
          if (!latest?.ContentHTML) {
            return { pages: [] };
          }

          try {
            const parsed = JSON.parse(latest.ContentHTML) as SitemapPayload;
            const pages = Array.isArray(parsed?.pages) ? parsed.pages : [];
            return { pages: pages.map((page) => this.normalizePage(page)) };
          } catch {
            return { pages: [] };
          }
        }),
        catchError(() => of({ pages: [] })),
        shareReplay(1)
      );
    }

    return this.sitemap$;
  }

  saveSitemap$(pages: SitemapPageRecord[]): Observable<unknown> {
    const payload: SitemapPayload = {
      pages: pages.map((page) => this.normalizePage(page)),
    };
    return this.api.saveContentBlock(SITEMAP_KEY, JSON.stringify(payload)).pipe(
      tap(() => {
        this.sitemap$ = undefined;
      })
    );
  }

  private normalizePage(page: SitemapPageRecord): SitemapPageRecord {
    const type = page.type || 'content';
    return {
      ...page,
      type,
      routePath: page.routePath || '',
      externalUrl: page.externalUrl || '',
      contentKey: page.contentKey || '',
      requiredPermissions: page.requiredPermissions || '',
    };
  }
}
