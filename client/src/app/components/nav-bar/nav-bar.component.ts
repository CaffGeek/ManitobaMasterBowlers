import { Component, Inject, OnInit } from '@angular/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { environment as env } from '../../../environments/environment';
import { PermissionService, PERMISSION } from '@services/permission.service';
import { Observable, of, switchMap } from 'rxjs';
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
  canAnyAdmin$: Observable<boolean>;
  canEditSitemap$: Observable<boolean>;
  canEditBowler$: Observable<boolean>;
  canEditContentBlocks$: Observable<boolean>;
  menuNodes: MenuNode[] = [];

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private permissions: PermissionService,
    private sitemap: SitemapService
  ) {
    this.canEditSitemap$ = this.auth.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          return of(false);
        }

        return this.permissions.checkPermission(PERMISSION.EDIT_SITEMAP);
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

    this.canEditContentBlocks$ = this.auth.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          return of(false);
        }

        return this.permissions.checkPermission(PERMISSION.EDIT_CONTENTBLOCKS);
      })
    );

    this.canAnyAdmin$ = this.canEditSitemap$.pipe(
      switchMap((canEditSitemap) => {
        if (canEditSitemap) {
          return of(true);
        }

        return this.canEditBowler$.pipe(
          switchMap((canEditBowler) => {
            if (canEditBowler) {
              return of(true);
            }

            return this.canEditContentBlocks$;
          })
        );
      })
    );
  }

  ngOnInit() {
    this.sitemap.loadSitemap$().subscribe((data) => {
      this.menuNodes = this.buildMenu(data.pages || []);
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

  private buildMenu(pages: SitemapPageRecord[]): MenuNode[] {
    const visiblePages = pages.filter((page) => {
      const type = page.type || 'content';
      return type === 'content' ? !!page.slug : true;
    });
    const allPagesMap = new Map(pages.map((page) => [page.id, page]));
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
}
