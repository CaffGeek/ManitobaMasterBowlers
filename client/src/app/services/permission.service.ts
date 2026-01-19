import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, map } from 'rxjs';

export enum PERMISSION {
  EDIT_TOURNAMENT = "edit:tournament",
  EDIT_SITEMAP = "edit:sitemap",
  EDIT_BOWLER = "edit:bowler",
  CREATE_SEASON = "create:season",
  EDIT_CONTENTBLOCKS = "edit:contentblocks",
}

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    public auth: AuthService
  ) { }

  checkPermission(permission: PERMISSION): Observable<boolean> {
    return this.auth.getAccessTokenSilently().pipe(map((token) => {
      let decoded = jwtDecode(token);
      console.log('permissions', (decoded?.['permissions'] || []));
      return (decoded?.['permissions'] || []).indexOf(permission) >= 0;
    }));
  }
}
