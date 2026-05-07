import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, retry, timer } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiRetryInterceptor implements HttpInterceptor {
  private readonly retryableMethods = new Set(['GET']);
  private readonly retryableStatusCodes = new Set([0, 500, 502, 503, 504]);
  private readonly maxRetries = 2;

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.shouldRetry(req)) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      retry({
        count: this.maxRetries,
        delay: (error, retryCount) => {
          if (!this.isRetryableError(error)) {
            throw error;
          }

          return timer(retryCount * 1000);
        },
      })
    );
  }

  private shouldRetry(req: HttpRequest<unknown>): boolean {
    return this.retryableMethods.has(req.method) && req.url.startsWith(environment.apiUri);
  }

  private isRetryableError(error: unknown): boolean {
    return error instanceof HttpErrorResponse && this.retryableStatusCodes.has(error.status);
  }
}
