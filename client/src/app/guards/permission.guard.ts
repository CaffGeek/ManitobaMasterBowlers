import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { PermissionService, PERMISSION } from '@services/permission.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private permissions: PermissionService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    const required = route.data['requiredPermission'] as PERMISSION | undefined;
    if (!required) {
      return of(true);
    }

    return this.auth.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          return of(false);
        }

        return this.permissions.checkPermission(required);
      }),
      catchError(() => of(false))
    );
  }
}
