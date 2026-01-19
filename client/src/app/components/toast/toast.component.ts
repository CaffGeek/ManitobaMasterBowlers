import { Component } from '@angular/core';
import { ToastService, ToastMessage } from '@services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  standalone: false,
})
export class ToastComponent {
  toasts$ = this.toastService.toasts$;

  constructor(private toastService: ToastService) {}

  dismiss(toast: ToastMessage) {
    this.toastService.dismiss(toast.id);
  }
}
