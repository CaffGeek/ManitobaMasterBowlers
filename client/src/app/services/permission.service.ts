import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

export enum PERMISSION {
  EDIT_TOURNAMENT = "edit:tournament",
  EDIT_CONTENT = "edit:content",
  EDIT_SECURECONTENT = "edit:securecontent",
  EDIT_ANNOUNCEMENTS = "edit:announcements",
  EDIT_SCHEDULE = "edit:schedule",
  EDIT_BOWLER = "edit:bowler",
  CREATE_SEASON = "create:season",
}

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    public auth: AuthService
  ) { }

  checkPermission(permission: PERMISSION): Observable<boolean> {
    return this.checkAnyPermissions([permission]);
  }

  getPermissions$(): Observable<string[]> {
    return this.auth.isAuthenticated$.pipe(
      switchMap((isAuth) => {
        if (!isAuth) {
          return of([]);
        }
        return this.auth.getAccessTokenSilently().pipe(
          map((token) => {
            const decoded = jwtDecode(token);
            return decoded?.['permissions'] || [];
          }),
          catchError(() => of([]))
        );
      })
    );
  }

  checkAnyPermissions(permissions: string[]): Observable<boolean> {
    if (!permissions || permissions.length === 0) {
      return of(true);
    }

    return this.auth.isAuthenticated$.pipe(
      switchMap((isAuth) => {
        if (!isAuth) {
          return of(false);
        }
        return this.auth.getAccessTokenSilently().pipe(
          map((token) => {
            const decoded = jwtDecode(token);
            const assigned = decoded?.['permissions'] || [];
            return permissions.some((permission) => assigned.includes(permission));
          }),
          catchError(() => of(false))
        );
      })
    );
  }
}
