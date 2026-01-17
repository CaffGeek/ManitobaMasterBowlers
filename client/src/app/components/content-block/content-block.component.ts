import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Observable, Subscription, of, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { PermissionService, PERMISSION } from '@services/permission.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.css'],
  standalone: false,
})
export class ContentBlockComponent implements OnInit, OnChanges, OnDestroy {
  @Input() key: string;
  content: SafeHtml | string = '';
  showEditor = false;
  canEdit$: Observable<boolean>;
  private contentSub?: Subscription;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private permissions: PermissionService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.canEdit$ = this.auth.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          return of(false);
        }

        return this.permissions.checkPermission(PERMISSION.EDIT_SITEMAP);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.key) {
      this.loadContent();
    }
  }

  ngOnDestroy(): void {
    this.contentSub?.unsubscribe();
  }

  private loadContent(): void {
    this.contentSub?.unsubscribe();
    this.content = '';
    if (!this.key) {
      return;
    }

    this.contentSub = this.api.contentBlocks$(this.key).subscribe((blocks) => {
      const latest = blocks.slice(-1)[0];
      const html = latest?.ContentHTML ? this.rewriteDocLinks(latest.ContentHTML) : '';
      this.content = html
        ? this.sanitizer.bypassSecurityTrustHtml(html)
        : '';
    });
  }

  toggleEditor(): void {
    this.showEditor = !this.showEditor;
    if (!this.showEditor) {
      this.loadContent();
    }
  }

  private rewriteDocLinks(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const anchors = Array.from(doc.querySelectorAll('a[href]'));
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    const basePrefix = baseHref.endsWith('/') ? baseHref : `${baseHref}/`;

    anchors.forEach((anchor) => {
      const href = anchor.getAttribute('href') || '';
      if (href.startsWith('/docs/')) {
        anchor.setAttribute('href', `${basePrefix}assets${href}`);
      } else if (href.startsWith('docs/')) {
        anchor.setAttribute('href', `${basePrefix}assets/${href}`);
      }

      if (anchor.getAttribute('href')?.includes('/assets/docs/')) {
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('rel', 'noopener');
      }
    });

    return doc.body.innerHTML;
  }

}
