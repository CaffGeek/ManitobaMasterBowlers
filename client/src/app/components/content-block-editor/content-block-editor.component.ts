import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '@services/api.service';
import { environment } from '../../../environments/environment';
import { MEDIA_MAX_UPLOAD_BYTES, MEDIA_MAX_UPLOAD_MB } from '../../constants/media';

@Component({
  selector: 'app-content-block-editor',
  templateUrl: './content-block-editor.component.html',
  styleUrls: ['./content-block-editor.component.css'],
  standalone: false,
})
export class ContentBlockEditorComponent implements OnChanges, AfterViewInit {
  @Input() key: string;
  @Input() showClose = false;
  @Output() close = new EventEmitter<void>();
  contentHtml = '';
  editorApiKey = environment.tinymceApiKey;
  editorInit = {
    base_url: this.getBasePath(),
    document_base_url: this.getDocumentBaseUrl(),
    plugins: 'table paste lists link code',
    menubar: 'file edit view insert format table tools',
    toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | link | paste | code',
    convert_urls: false,
    relative_urls: false,
    remove_script_host: false,
    link_protocols: [
      { name: 'http', protocol: 'http' },
      { name: 'https', protocol: 'https' },
      { name: 'mailto', protocol: 'mailto' },
      { name: 'tel', protocol: 'tel' },
    ],
    paste_data_images: true,
    automatic_uploads: true,
    height: 640,
    resize: 'both',
    images_upload_handler: (blobInfo, _progress) => new Promise<string>((resolve, reject) => {
      const fileName = blobInfo.filename();
      const contentType = blobInfo.blob()?.type || 'application/octet-stream';
      const fileSize = blobInfo.blob()?.size || 0;
      const dataBase64 = blobInfo.base64();
      const prefix = this.key ? this.key : 'content';
      if (fileSize > MEDIA_MAX_UPLOAD_BYTES) {
        reject(`File too large. Maximum size is ${MEDIA_MAX_UPLOAD_MB}MB.`);
        return;
      }

      this.api.uploadMedia({ fileName, contentType, dataBase64, prefix }).subscribe({
        next: (response: any) => {
          const url = response?.url;
          if (!url) {
            reject('Upload failed');
            return;
          }
          resolve(url);
        },
        error: () => reject('Upload failed'),
      });
    }),
  };
  
  constructor(
    private api: ApiService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadContent();
  }
  
  ngAfterViewInit(): void {
    this.loadContent();
  }

  saveContent() {
    if (!this.key) return;
    this.api.saveContentBlock(this.key, this.contentHtml).subscribe(() => {
      if (this.showClose) {
        this.close.emit();
      }
    });
  }

  closeEditor() {
    this.close.emit();
  }

  private loadContent() {
    if (!this.key) return;
    this.api.contentBlocks$(this.key).subscribe((blocks) => {
      this.contentHtml = blocks.slice(-1)?.[0]?.ContentHTML || '';
    });
  }

  private getBasePath() {
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    const trimmed = baseHref.endsWith('/') && baseHref.length > 1 ? baseHref.slice(0, -1) : baseHref;
    const prefix = trimmed === '/' ? '' : trimmed;
    return `${prefix}/assets/tinymce`;
  }

  private getDocumentBaseUrl() {
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    const normalized = baseHref.endsWith('/') ? baseHref : `${baseHref}/`;
    return `${window.location.origin}${normalized}`;
  }
}
