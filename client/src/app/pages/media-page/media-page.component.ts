import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '@services/api.service';
import { ToastService } from '@services/toast.service';
import { ConfirmDialogService } from '@services/confirm-dialog.service';
import { MEDIA_MAX_UPLOAD_BYTES, MEDIA_MAX_UPLOAD_MB } from '../../constants/media';

@Component({
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.css'],
  standalone: false,
})
export class MediaPageComponent implements OnInit {
  private readonly maxUploadBytes = MEDIA_MAX_UPLOAD_BYTES;
  faTrash = faTrash;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  selectedItemUrl: string | null = null;
  uploadedUrl: string | null = null;
  isUploading = false;
  errorMessage = '';
  mediaItems: any[] = [];
  filteredItems: any[] = [];
  filterText = '';

  constructor(
    private api: ApiService,
    private toasts: ToastService,
    private confirm: ConfirmDialogService
  ) {}

  ngOnInit() {
    this.loadMedia();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.selectedFile = file;
    this.uploadedUrl = null;
    this.selectedItemUrl = null;
    this.errorMessage = '';

    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }

    if (file) {
      this.previewUrl = URL.createObjectURL(file);
    }
  }

  upload() {
    if (!this.selectedFile || this.isUploading) {
      return;
    }
    if (this.selectedFile.size > this.maxUploadBytes) {
      this.toasts.show(`File too large. Maximum size is ${MEDIA_MAX_UPLOAD_MB}MB.`, 'error');
      return;
    }

    this.isUploading = true;
    this.errorMessage = '';
    const file = this.selectedFile;
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] || '';

      this.api.uploadMedia({
        fileName: file.name,
        contentType: file.type || 'application/octet-stream',
        dataBase64: base64,
      }).subscribe({
        next: (response: any) => {
          this.uploadedUrl = response?.url || '';
          this.selectedItemUrl = this.uploadedUrl || null;
          this.loadMedia();
          this.isUploading = false;
        },
        error: () => {
          this.errorMessage = 'Upload failed. Please try again.';
          this.isUploading = false;
        },
      });
    };

    reader.onerror = () => {
      this.errorMessage = 'Could not read the file.';
      this.isUploading = false;
    };

    reader.readAsDataURL(file);
  }

  copyUrl() {
    if (!this.uploadedUrl) {
      return;
    }
    navigator.clipboard?.writeText(this.uploadedUrl);
  }

  applyFilter() {
    const term = this.filterText.trim().toLowerCase();
    if (!term) {
      this.filteredItems = [...this.mediaItems];
      return;
    }
    this.filteredItems = this.mediaItems.filter(item => item.name.toLowerCase().includes(term));
  }

  confirmDelete(item: any) {
    this.confirm
      .confirm({
        title: 'Remove media',
        message: `Remove "${item.name}"? This cannot be undone.`,
        confirmText: 'Remove',
      })
      .subscribe((ok) => {
        if (!ok) {
          return;
        }

        if (this.selectedItemUrl === item.url) {
          this.selectedItemUrl = null;
        }

        this.api.deleteMedia(item.name).subscribe({
          next: () => this.loadMedia(),
          error: () => {
            this.errorMessage = 'Delete failed. Please try again.';
          },
        });
      });
  }

  selectItem(item: any) {
    this.selectedItemUrl = item.url;
    this.selectedFile = null;
    this.uploadedUrl = null;
    this.errorMessage = '';
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }
  }

  private loadMedia() {
    this.api.listMedia$().subscribe({
      next: (items) => {
        this.mediaItems = items || [];
        this.filteredItems = [...this.mediaItems];
        if (this.selectedItemUrl) {
          const stillExists = this.mediaItems.some(item => item.url === this.selectedItemUrl);
          if (!stillExists) {
            this.selectedItemUrl = null;
          }
        }
      },
      error: () => {
        this.errorMessage = 'Could not load media list.';
      },
    });
  }
}
