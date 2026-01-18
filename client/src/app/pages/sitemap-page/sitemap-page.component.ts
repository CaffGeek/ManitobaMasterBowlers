import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { SitemapService } from '@services/sitemap.service';
import { SitemapLayout, SitemapPageRecord, SitemapPageType } from '@models/SitemapPageRecord';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sitemap-page',
  templateUrl: './sitemap-page.component.html',
  styleUrls: ['./sitemap-page.component.css'],
  standalone: false,
})
export class SitemapPageComponent implements OnInit {
  pages: SitemapPageRecord[] = [];
  contentKeys: string[] = [];
  tree: SitemapNode[] = [];
  dropListIds: string[] = [];
  selectedPageId?: string;
  private routeSlug?: string;
  private routeSub?: Subscription;
  layouts: { value: SitemapLayout; label: string }[] = [
    { value: 'full', label: 'Full page' },
    { value: 'sidebar-left', label: 'Sidebar left' },
    { value: 'sidebar-right', label: 'Sidebar right' },
    { value: 'menu-only', label: 'Menu only' },
  ];
  pageTypes: { value: SitemapPageType; label: string }[] = [
    { value: 'content', label: 'Content page' },
    { value: 'route', label: 'Route' },
    { value: 'external', label: 'External link' },
    { value: 'menu-only', label: 'Menu only' },
  ];

  constructor(
    private api: ApiService,
    private sitemap: SitemapService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      this.routeSlug = params.get('slug')?.toLowerCase() || undefined;
      this.applyRouteSelection();
    });

    this.api.contentBlocks$().subscribe((blocks) => {
      this.contentKeys = [...new Set(blocks.map((block) => block.ContentBlock))]
        .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
    });

    this.sitemap.loadSitemap$().subscribe((data) => {
      this.pages = (data.pages || []).map((page) => ({ ...page }));
      this.rebuildTree();
      this.applyRouteSelection();
    });
  }

  addPage(parentId?: string): void {
    const id = this.generateId();
    this.pages.push({
      id,
      title: 'New Page',
      slug: `new-page-${this.pages.length + 1}`,
      parentId,
      menuVisible: true,
      menuOrder: this.pages.length + 1,
      layout: 'sidebar-left',
      contentKey: '',
      sidebarKey: '',
      type: 'content',
      routePath: '',
      externalUrl: '',
    });
    this.rebuildTree();
    this.selectedPageId = id;
  }

  removePage(index: number): void {
    if (!confirm('Delete this page?')) {
      return;
    }

    this.pages.splice(index, 1);
    this.rebuildTree();
  }

  selectPage(pageId: string): void {
    this.selectedPageId = pageId;
    const page = this.pages.find((entry) => entry.id === pageId);
    const slug = page ? this.getRouteSlug(page) : '';
    if (slug) {
      this.router.navigate(['/sitemap', slug]);
    } else {
      this.router.navigate(['/sitemap']);
    }
  }

  save(): void {
    this.syncFromTree();
    const normalized = this.pages.map((page, index) => ({
      ...page,
      id: page.id || this.generateId(),
      title: page.title?.trim() || `Page ${index + 1}`,
      slug: page.type === 'content'
        ? this.slugify(page.title || `page-${index + 1}`)
        : (page.slug || ''),
      menuOrder: index + 1,
      contentKey: page.contentKey?.trim() || '',
      sidebarKey: page.sidebarKey?.trim() || '',
      type: page.type || (page.layout === 'menu-only' ? 'menu-only' : 'content'),
      routePath: page.routePath?.trim() || '',
      externalUrl: page.externalUrl?.trim() || '',
    }));

    this.pages = normalized;
    this.sitemap.saveSitemap(normalized);
    this.rebuildTree();
    this.selectedPageId = undefined;
    this.router.navigate(['/sitemap']);
  }

  updateSlug(page: SitemapPageRecord): void {
    if (page.type === 'content') {
      page.slug = this.slugify(page.title || '');
    }
  }

  trackById(_index: number, page: SitemapPageRecord): string {
    return page.id;
  }

  onTypeChange(page: SitemapPageRecord): void {
    if (page.type === 'menu-only') {
      page.layout = 'menu-only';
      page.contentKey = '';
      page.sidebarKey = '';
      page.routePath = '';
      page.externalUrl = '';
    }
    if (page.type === 'route') {
      page.layout = 'menu-only';
      page.contentKey = '';
      page.sidebarKey = '';
      page.externalUrl = '';
    }
    if (page.type === 'external') {
      page.layout = 'menu-only';
      page.contentKey = '';
      page.sidebarKey = '';
      page.routePath = '';
    }
    if (page.type === 'content' && page.layout === 'menu-only') {
      page.layout = 'sidebar-left';
    }
    this.rebuildTree();
  }

  onDrop(event: CdkDragDrop<DropListData>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.nodes, event.previousIndex, event.currentIndex);
    } else {
      const moved = event.previousContainer.data.nodes[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data.nodes,
        event.container.data.nodes,
        event.previousIndex,
        event.currentIndex
      );
      moved.page.parentId = event.container.data.parentId;
    }

    this.syncFromTree();
    this.sitemap.saveSitemap(this.pages);
    this.rebuildTree();
  }

  getDropListId(parentId?: string): string {
    return parentId ? `sitemap-${parentId}` : 'sitemap-root';
  }

  get selectedPage(): SitemapPageRecord | undefined {
    return this.pages.find((page) => page.id === this.selectedPageId);
  }

  private rebuildTree(): void {
    this.tree = this.buildTree(this.pages);
    this.dropListIds = this.collectDropListIds(this.tree);
    if (!this.selectedPageId && this.pages.length > 0 && !this.routeSlug) {
      this.selectedPageId = this.pages[0].id;
    }
  }

  private buildTree(pages: SitemapPageRecord[]): SitemapNode[] {
    const sorted = [...pages].sort((a, b) => (a.menuOrder || 0) - (b.menuOrder || 0));
    const nodeMap = new Map<string, SitemapNode>();
    sorted.forEach((page) => {
      nodeMap.set(page.id, { page, children: [] });
    });

    const roots: SitemapNode[] = [];
    sorted.forEach((page) => {
      const node = nodeMap.get(page.id);
      if (!node) {
        return;
      }

      if (page.parentId && nodeMap.has(page.parentId)) {
        nodeMap.get(page.parentId)?.children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }

  private syncFromTree(): void {
    const flattened: SitemapPageRecord[] = [];
    const walk = (nodes: SitemapNode[], parentId?: string) => {
      nodes.forEach((node, index) => {
        node.page.parentId = parentId;
        node.page.menuOrder = index + 1;
        flattened.push(node.page);
        if (node.children.length > 0) {
          walk(node.children, node.page.id);
        }
      });
    };

    walk(this.tree);
    this.pages = flattened;
  }

  private collectDropListIds(nodes: SitemapNode[], ids: string[] = [], parentId?: string): string[] {
    ids.push(this.getDropListId(parentId));
    nodes.forEach((node) => {
      this.collectDropListIds(node.children, ids, node.page.id);
    });
    return ids;
  }

  private slugify(value: string): string {
    const trimmed = value.trim().toLowerCase();
    const cleaned = trimmed.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    return cleaned || 'page';
  }

  private getRouteSlug(page: SitemapPageRecord): string {
    const slug = page.title ? this.slugify(page.title) : '';
    return slug || page.id;
  }

  getSectionsFor(page: SitemapPageRecord): SitemapPageRecord[] {
    return this.pages
      .filter((entry) => entry.parentId === page.id && page.type === 'content')
      .sort((a, b) => (a.menuOrder || 0) - (b.menuOrder || 0));
  }

  isSectionPage(page: SitemapPageRecord): boolean {
    if (!page.parentId) {
      return false;
    }

    const parent = this.pages.find((entry) => entry.id === page.parentId);
    return (parent?.type || 'content') === 'content';
  }

  private applyRouteSelection(): void {
    if (!this.routeSlug || this.pages.length === 0) {
      return;
    }

    const match = this.pages.find((page) => this.getRouteSlug(page) === this.routeSlug);
    if (match) {
      this.selectedPageId = match.id;
    }
  }


  private generateId(): string {
    return `page_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  }
}

interface SitemapNode {
  page: SitemapPageRecord;
  children: SitemapNode[];
}

interface DropListData {
  parentId?: string;
  nodes: SitemapNode[];
}
