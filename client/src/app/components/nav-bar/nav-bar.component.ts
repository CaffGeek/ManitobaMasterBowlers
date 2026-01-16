import { Component, Inject, OnInit } from '@angular/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { environment as env } from '../../../environments/environment';
import { PermissionService, PERMISSION } from '@services/permission.service';
import { Observable, of, switchMap } from 'rxjs';

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

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private permissions: PermissionService
  ) {
    this.canEditSitemap$ = this.auth.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          return of(false);
        }

        return this.permissions.checkPermission(PERMISSION.EDIT_SITEMAP);
      })
    );

    this.canAnyAdmin$ = this.canEditSitemap$;
  }

  ngOnInit() {
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
}
