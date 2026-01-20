import { Component } from '@angular/core';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.css'],
  standalone: false,
})
export class MediaPageComponent {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  uploadedUrl: string | null = null;
  isUploading = false;
  errorMessage = '';

  constructor(private api: ApiService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.selectedFile = file;
    this.uploadedUrl = null;
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
}
