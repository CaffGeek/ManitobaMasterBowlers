import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'error' | 'info' | 'success';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messages$ = new BehaviorSubject<ToastMessage[]>([]);
  private nextId = 1;

  get toasts$() {
    return this.messages$.asObservable();
  }

  show(message: string, type: ToastType = 'error', durationMs = 4000) {
    const id = this.nextId++;
    const next = [...this.messages$.value, { id, message, type }];
    this.messages$.next(next);

    window.setTimeout(() => this.dismiss(id), durationMs);
  }

  dismiss(id: number) {
    const next = this.messages$.value.filter((toast) => toast.id !== id);
    this.messages$.next(next);
  }
}
