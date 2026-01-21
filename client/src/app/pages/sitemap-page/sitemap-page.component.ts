import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ApiService } from '@services/api.service';
import { SitemapService } from '@services/sitemap.service';
import { SitemapPageRecord, SitemapPageType } from '@models/SitemapPageRecord';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PERMISSION, PermissionService } from '@services/permission.service';
import { ToastService } from '@services/toast.service';

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
  selectedPageId?: string;
  @ViewChild('treeScroller') treeScroller?: ElementRef<HTMLDivElement>;
  @ViewChildren('treeRow') treeRows?: QueryList<ElementRef<HTMLDivElement>>;
  private routeSlug?: string;
  private routeSub?: Subscription;
  pageTypes: { value: SitemapPageType; label: string }[] = [
    { value: 'content', label: 'Content page' },
    { value: 'route', label: 'Route' },
    { value: 'external', label: 'External link' },
    { value: 'menu-only', label: 'Menu only' },
  ];
  canEditSecureContent$ = this.permissions.checkPermission(PERMISSION.EDIT_SECURECONTENT);
  permissionOptions = Object.values(PERMISSION);

  constructor(
    private api: ApiService,
    private sitemap: SitemapService,
    private route: ActivatedRoute,
    private router: Router,
    private permissions: PermissionService,
    private toasts: ToastService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      this.routeSlug = params.get('slug')?.toLowerCase() || undefined;
      this.applyRouteSelection();
    });

    this.api.contentBlocks$().subscribe((blocks) => {
      this.contentKeys = [...new Set(blocks.map((block) => block.ContentBlock))]
        .filter((key) => !key.startsWith('_'))
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
    const normalizedParentId = parentId || undefined;
    const siblings = this.pages.filter((entry) => entry.parentId === normalizedParentId);
    const maxOrder = siblings.reduce((max, entry) => Math.max(max, entry.menuOrder || 0), 0);
    this.pages.push({
      id,
      title: '',
      slug: '',
      parentId: normalizedParentId,
      menuVisible: true,
      menuOrder: maxOrder + 1,
      contentKey: '',
      requiredPermissions: '',
      type: 'content',
      routePath: '',
      externalUrl: '',
    });
    this.pages = [...this.pages];
    this.rebuildTree();
    this.selectedPageId = id;
  }

  removePage(pageId: string): void {
    if (!confirm('Delete this page?')) {
      return;
    }

    const idsToRemove = new Set([pageId, ...this.getDescendantIds(pageId)]);
    this.pages = this.pages.filter((page) => !idsToRemove.has(page.id));
    if (this.selectedPageId && idsToRemove.has(this.selectedPageId)) {
      this.selectedPageId = undefined;
      this.router.navigate(['/sitemap']);
    }
    this.tree = this.buildTree(this.pages);
    this.syncFromTree();
    this.sitemap.saveSitemap(this.pages);
    this.rebuildTree();
  }

  selectPage(pageId: string): void {
    this.selectedPageId = pageId;
    const page = this.pages.find((entry) => entry.id === pageId);
    const slug = page ? this.getRouteSlug(page) : '';
    this.scrollSelectedIntoView();
    if (slug) {
      this.router.navigate(['/sitemap', slug]);
    } else {
      this.router.navigate(['/sitemap']);
    }
  }

  onParentChange(page: SitemapPageRecord): void {
    const siblings = this.pages.filter((entry) => entry.parentId === page.parentId && entry.id !== page.id);
    const maxOrder = siblings.reduce((max, entry) => Math.max(max, entry.menuOrder || 0), 0);
    page.menuOrder = maxOrder + 1;
    this.rebuildTree();
  }

  getParentOptions(page: SitemapPageRecord): ParentOption[] {
    const excluded = new Set([page.id, ...this.getDescendantIds(page.id)]);
    const options: ParentOption[] = [{ id: '', label: 'Top level' }];

    const walk = (nodes: SitemapNode[], depth: number) => {
      nodes.forEach((node) => {
        if (!excluded.has(node.page.id) && !this.isSectionPage(node.page)) {
          options.push({
            id: node.page.id,
            label: `${'-- '.repeat(depth)}${node.page.title || 'Untitled'}`,
          });
        }
        if (node.children.length > 0) {
          walk(node.children, depth + 1);
        }
      });
    };

    walk(this.tree, 0);
    return options;
  }

  moveNode(nodes: SitemapNode[], fromIndex: number, toIndex: number): void {
    if (toIndex < 0 || toIndex >= nodes.length || fromIndex === toIndex) {
      return;
    }

    const updated = [...nodes];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    nodes.splice(0, nodes.length, ...updated);

    this.syncFromTree();
    this.sitemap.saveSitemap(this.pages);
    this.rebuildTree();
  }

  save(): void {
    this.syncFromTree();
    const usedSlugs = new Set(
      this.pages
        .filter((page) => page.type === 'content' && page.slug)
        .map((page) => (page.slug || '').toLowerCase())
    );
    const normalized = this.pages.map((page, index) => {
      const title = page.title?.trim() || `Page ${index + 1}`;
      const contentKey = page.contentKey?.trim() || '';
      const id = page.id || this.generateId();
      const parentSlug = this.getParentSlug(page);
      const baseSegment = this.slugify(contentKey || title || `page-${index + 1}`);
      const baseSlug = parentSlug ? `${parentSlug}-${baseSegment}` : baseSegment;
      const hasSlug = (page.slug || '').trim().length > 0;
      let slug = page.slug || '';
      if (page.type === 'content' && !hasSlug) {
        slug = this.createUniqueSlug(baseSlug, usedSlugs);
      }
      if (page.type === 'content' && hasSlug) {
        usedSlugs.add(slug.toLowerCase());
      }
      if (page.type !== 'content') {
        slug = page.slug || '';
      }

      return {
        ...page,
        id,
        title,
        slug,
        menuOrder: index + 1,
        contentKey,
        requiredPermissions: page.requiredPermissions?.trim() || '',
        type: page.type || 'content',
        routePath: page.routePath?.trim() || '',
        externalUrl: page.externalUrl?.trim() || '',
      };
    });

    this.pages = normalized;
    this.sitemap.saveSitemap(normalized);
    this.rebuildTree();
    this.toasts.show('Sitemap saved.', 'success');
  }

  updateSlug(page: SitemapPageRecord): void {
    if (page.type === 'content') {
      if (!page.slug) {
        page.slug = this.slugify(page.title || '');
      }
    }
  }

  trackById(_index: number, page: SitemapPageRecord): string {
    return page.id;
  }

  onTypeChange(page: SitemapPageRecord): void {
    if (page.type === 'menu-only') {
      page.contentKey = '';
      page.routePath = '';
      page.externalUrl = '';
    }
    if (page.type === 'route') {
      page.contentKey = '';
      page.externalUrl = '';
    }
    if (page.type === 'external') {
      page.contentKey = '';
      page.routePath = '';
    }
    this.rebuildTree();
  }

  isPermissionSelected(page: SitemapPageRecord, permission: string): boolean {
    return this.parsePermissions(page.requiredPermissions).includes(permission);
  }

  togglePermission(page: SitemapPageRecord, permission: string, checked: boolean): void {
    const current = new Set(this.parsePermissions(page.requiredPermissions));
    if (checked) {
      current.add(permission);
    } else {
      current.delete(permission);
    }
    page.requiredPermissions = Array.from(current).join(',');
  }

  getPermissionSummary(page: SitemapPageRecord): string {
    const selected = this.parsePermissions(page.requiredPermissions);
    return selected.length > 0 ? `${selected.length} selected` : 'None';
  }

  getPermissionId(page: SitemapPageRecord, permission: string): string {
    return `perm-${page.id}-${permission.replace(/[^a-z0-9]+/gi, '-')}`;
  }

  get selectedPage(): SitemapPageRecord | undefined {
    return this.pages.find((page) => page.id === this.selectedPageId);
  }

  private rebuildTree(): void {
    this.tree = this.buildTree(this.pages);
    if (!this.selectedPageId && this.pages.length > 0 && !this.routeSlug) {
      this.selectedPageId = this.pages[0].id;
    }
    this.scrollSelectedIntoView();
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

  private slugify(value: string): string {
    const trimmed = value.trim().toLowerCase();
    const cleaned = trimmed.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    return cleaned || 'page';
  }

  private createUniqueSlug(baseSlug: string, usedSlugs: Set<string>): string {
    let candidate = baseSlug;
    let counter = 2;
    while (usedSlugs.has(candidate.toLowerCase())) {
      candidate = `${baseSlug}-${counter}`;
      counter += 1;
    }
    usedSlugs.add(candidate.toLowerCase());
    return candidate;
  }

  private getParentSlug(page: SitemapPageRecord): string {
    const parts: string[] = [];
    let currentParentId = page.parentId;
    while (currentParentId) {
      const parent = this.pages.find((entry) => entry.id === currentParentId);
      if (!parent) {
        break;
      }
      if (parent.title) {
        parts.unshift(this.slugify(parent.title));
      }
      currentParentId = parent.parentId;
    }
    return parts.filter((part) => part.length > 0).join('-');
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
      this.scrollSelectedIntoView();
    }
  }


  private generateId(): string {
    return `page_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  }

  private getDescendantIds(parentId: string): string[] {
    const children = this.pages.filter((entry) => entry.parentId === parentId);
    const ids: string[] = [];
    children.forEach((child) => {
      ids.push(child.id);
      ids.push(...this.getDescendantIds(child.id));
    });
    return ids;
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

  private scrollSelectedIntoView(): void {
    const container = this.treeScroller?.nativeElement;
    if (!container || !this.selectedPageId) {
      return;
    }
    setTimeout(() => {
      const row = this.treeRows
        ?.find((entry) => entry.nativeElement.dataset.pageId === this.selectedPageId)
        ?.nativeElement;
      if (!row) {
        return;
      }
      const rowTop = row.offsetTop;
      const rowBottom = rowTop + row.offsetHeight;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;
      if (rowTop < containerTop) {
        container.scrollTop = Math.max(0, rowTop - 8);
      } else if (rowBottom > containerBottom) {
        container.scrollTop = rowBottom - container.clientHeight + 8;
      }
    }, 0);
  }
}

interface SitemapNode {
  page: SitemapPageRecord;
  children: SitemapNode[];
}

interface ParentOption {
  id: string;
  label: string;
}
