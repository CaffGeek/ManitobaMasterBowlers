import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SitemapService } from '@services/sitemap.service';
import { SitemapPageRecord } from '@models/SitemapPageRecord';
import { environment as env } from '../../../environments/environment';
import { PermissionService } from '@services/permission.service';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css'],
  standalone: false,
})
export class ContentPageComponent implements OnInit, OnDestroy {
  blockKey = '';
  sectionKey = '';
  contentKey = '';
  sections: SitemapPageRecord[] = [];
  parentPage?: SitemapPageRecord;
  hasAccess = true;
  private routeSub?: Subscription;
  private sitemapSub?: Subscription;
  private permissionSub?: Subscription;
  private sitemapPages: SitemapPageRecord[] = [];

  constructor(
    private route: ActivatedRoute,
    private sitemap: SitemapService,
    private permissions: PermissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sitemapSub = this.sitemap.loadSitemap$().subscribe((data) => {
      this.sitemapPages = data.pages || [];
      this.applyPageConfig();
    });

    this.routeSub = this.route.paramMap.subscribe((params) => {
      this.blockKey = params.get('blockKey') ?? '';
      this.sectionKey = params.get('sectionKey') ?? '';
      this.applyPageConfig();
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.sitemapSub?.unsubscribe();
    this.permissionSub?.unsubscribe();
  }

  private applyPageConfig(): void {
    this.permissionSub?.unsubscribe();
    this.hasAccess = true;

    if (!this.blockKey) {
      this.contentKey = '';
      this.sections = [];
      this.parentPage = undefined;
      return;
    }

    const page = this.sitemapPages.find((entry) => entry.slug === this.blockKey);
    if (!page) {
      this.contentKey = this.blockKey;
      this.sections = [];
      this.parentPage = undefined;
      return;
    }

    this.parentPage = page;
    this.sections = this.sitemapPages
      .filter((entry) => entry.parentId === page.id)
      .sort((a, b) => (a.menuOrder || 0) - (b.menuOrder || 0));

    if (page.type && page.type !== 'content') {
      this.contentKey = '';
      return;
    }

    if (this.sections.length > 0) {
      const selected = this.sections.find((section) => section.slug === this.sectionKey) || this.sections[0];
      this.contentKey = selected?.contentKey || selected?.slug || page.slug;
      this.evaluateAccess(page, selected);
      return;
    }

    this.contentKey = page.contentKey || page.slug;
    this.evaluateAccess(page);
  }

  isExternalSection(section: SitemapPageRecord): boolean {
    return (section.type || 'content') === 'external';
  }

  isRouteSection(section: SitemapPageRecord): boolean {
    return (section.type || 'content') === 'route';
  }

  getSectionRoute(section: SitemapPageRecord): string {
    return section.routePath || '/';
  }

  getSectionExternalUrl(section: SitemapPageRecord): string {
    const url = section.externalUrl || '';
    if (url.startsWith('/docs/')) {
      return `${env.appBasePath || ''}/assets${url}`;
    }
    return url;
  }

  get selectedSectionId(): string {
    if (this.sections.length === 0) {
      return '';
    }
    const selected = this.sections.find((section) => section.slug === this.sectionKey) || this.sections[0];
    return selected?.id || '';
  }

  onSectionSelect(sectionId: string): void {
    const section = this.sections.find((entry) => entry.id === sectionId);
    if (!section) {
      return;
    }

    if (this.isExternalSection(section)) {
      window.open(this.getSectionExternalUrl(section), '_blank', 'noopener');
      return;
    }

    if (this.isRouteSection(section)) {
      this.router.navigateByUrl(this.getSectionRoute(section));
      return;
    }

    if (!this.parentPage) {
      return;
    }

    this.router.navigate(['/content', this.parentPage.slug, section.slug]);
  }

  private evaluateAccess(page: SitemapPageRecord, section?: SitemapPageRecord): void {
    const required = this.parsePermissions(section?.requiredPermissions || page.requiredPermissions);
    if (required.length === 0) {
      this.hasAccess = true;
      return;
    }

    this.permissionSub = this.permissions.checkAnyPermissions(required).subscribe((allowed) => {
      this.hasAccess = allowed;
    });
  }

  private parsePermissions(value?: string): string[] {
    if (!value) {
      return [];
    }
    return value
      .split(',')
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);
  }
}
