import { Component, Inject, OnInit } from '@angular/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { environment as env } from '../../../environments/environment';
import { PermissionService, PERMISSION } from '@services/permission.service';
import { Observable, combineLatest, of, switchMap } from 'rxjs';
import { SitemapService } from '@services/sitemap.service';
import { SitemapPageRecord } from '@models/SitemapPageRecord';

interface MenuNode {
  page: SitemapPageRecord;
  children: SitemapPageRecord[];
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: false,
})
export class NavBarComponent implements OnInit {
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;
  canEditContent$: Observable<boolean>;
  canEditSchedule$: Observable<boolean>;
  canEditBowler$: Observable<boolean>;
  menuNodes: MenuNode[] = [];

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private permissions: PermissionService,
    private sitemap: SitemapService
  ) {
    this.canEditContent$ = this.auth.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          return of(false);
        }

        return this.permissions.checkPermission(PERMISSION.EDIT_CONTENT);
      })
    );

    this.canEditSchedule$ = this.auth.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          return of(false);
        }

        return this.permissions.checkPermission(PERMISSION.EDIT_SCHEDULE);
      })
    );

    this.canEditBowler$ = this.auth.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          return of(false);
        }

        return this.permissions.checkPermission(PERMISSION.EDIT_BOWLER);
      })
    );

  }

  ngOnInit() {
    combineLatest([
      this.sitemap.loadSitemap$(),
      this.permissions.getPermissions$(),
    ]).subscribe(([data, permissions]) => {
      this.menuNodes = this.buildMenu(data.pages || [], permissions);
    });
  }

  loginWithRedirect() {
    const redirectUri = `${this.doc.location.origin}${env.appBasePath || ''}`;
    this.auth.loginWithRedirect({
      authorizationParams: {
        ...((env.auth as any).authorizationParams || {}),
        redirect_uri: redirectUri,
      }
    });
  }

  logout() {
    const returnTo = `${this.doc.location.origin}${env.appBasePath || ''}`;
    this.auth.logout({ logoutParams: { returnTo } });
  }

  collapseMenu() {
    this.isCollapsed = true;
  }

  private buildMenu(pages: SitemapPageRecord[], permissions: string[]): MenuNode[] {
    const allowedIds = new Set(
      pages
        .filter((page) => this.isAllowedPage(page, permissions))
        .map((page) => page.id)
    );
    const allowedPages = pages.filter((page) => {
      if (!allowedIds.has(page.id)) {
        return false;
      }
      if (page.parentId) {
        return allowedIds.has(page.parentId);
      }
      return true;
    });

    const visiblePages = allowedPages.filter((page) => {
      const type = page.type || 'content';
      return type === 'content' ? !!page.slug : true;
    });
    const allPagesMap = new Map(allowedPages.map((page) => [page.id, page]));
    const menuPages = visiblePages.filter((page) => {
      if (!page.parentId) {
        return true;
      }

      const parent = allPagesMap.get(page.parentId);
      if (!parent) {
        return true;
      }

      return (parent.type || 'content') !== 'content';
    });
    const pageMap = new Map(menuPages.map((page) => [page.id, page]));
    const childrenMap = new Map<string, SitemapPageRecord[]>();
    const topLevel: SitemapPageRecord[] = [];

    menuPages.forEach((page) => {
      if (page.parentId && pageMap.has(page.parentId)) {
        const children = childrenMap.get(page.parentId) || [];
        children.push(page);
        childrenMap.set(page.parentId, children);
      } else {
        topLevel.push(page);
      }
    });

    const sortByOrder = (list: SitemapPageRecord[]) =>
      list.sort((a, b) => (a.menuOrder || 0) - (b.menuOrder || 0));

    sortByOrder(topLevel);
    return topLevel.map((page) => ({
      page,
      children: sortByOrder(childrenMap.get(page.id) || []),
    }));
  }

  private isAllowedPage(page: SitemapPageRecord, permissions: string[]): boolean {
    const required = this.parsePermissions(page.requiredPermissions);
    if (required.length === 0) {
      return true;
    }
    return required.some((permission) => permissions.includes(permission));
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
