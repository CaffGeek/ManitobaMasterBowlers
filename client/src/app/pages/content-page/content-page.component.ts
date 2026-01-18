import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SitemapService } from '@services/sitemap.service';
import { SitemapLayout, SitemapPageRecord } from '@models/SitemapPageRecord';

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
  sidebarKey = '';
  layout: SitemapLayout = 'sidebar-left';
  sections: SitemapPageRecord[] = [];
  parentPage?: SitemapPageRecord;
  private routeSub?: Subscription;
  private sitemapSub?: Subscription;
  private sitemapPages: SitemapPageRecord[] = [];

  constructor(
    private route: ActivatedRoute,
    private sitemap: SitemapService
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
  }

  private applyPageConfig(): void {
    if (!this.blockKey) {
      this.contentKey = '';
      this.sidebarKey = '';
      this.layout = 'sidebar-left';
      this.sections = [];
      this.parentPage = undefined;
      return;
    }

    const page = this.sitemapPages.find((entry) => entry.slug === this.blockKey);
    if (!page) {
      this.contentKey = this.blockKey;
      this.sidebarKey = `${this.blockKey}_sidebar`;
      this.layout = 'sidebar-left';
      this.sections = [];
      this.parentPage = undefined;
      return;
    }

    this.parentPage = page;
    this.layout = page.layout || 'sidebar-left';
    this.sections = this.sitemapPages
      .filter((entry) => entry.parentId === page.id)
      .sort((a, b) => (a.menuOrder || 0) - (b.menuOrder || 0));

    if (page.type && page.type !== 'content') {
      this.contentKey = '';
      this.sidebarKey = '';
      return;
    }

    if (this.sections.length > 0) {
      const selected = this.sections.find((section) => section.slug === this.sectionKey) || this.sections[0];
      this.contentKey = selected?.contentKey || selected?.slug || page.slug;
      this.sidebarKey = page.sidebarKey || `${page.slug}_sidebar`;
      return;
    }

    this.contentKey = page.contentKey || page.slug;
    this.sidebarKey = page.sidebarKey || `${page.slug}_sidebar`;
  }
}
