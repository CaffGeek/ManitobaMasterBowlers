import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from '@services/toast.service';

@Injectable()
export class ErrorToastInterceptor implements HttpInterceptor {
  constructor(private toasts: ToastService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error) => {
        const message = error?.error?.message || error?.message || 'Request failed. Please try again.';
        this.toasts.show(message, 'error');
        return throwError(() => error);
      })
    );
  }
}
