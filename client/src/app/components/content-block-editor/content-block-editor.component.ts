import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '@services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-content-block-editor',
  templateUrl: './content-block-editor.component.html',
  styleUrls: ['./content-block-editor.component.css'],
  standalone: false,
})
export class ContentBlockEditorComponent implements OnChanges, AfterViewInit {
  @Input() key: string;
  contentHtml = '';
  editorApiKey = environment.tinymceApiKey;
  editorInit = {
    base_url: this.getBasePath(),
    plugins: 'table paste lists link code',
    menubar: 'file edit view insert format table tools',
    toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | link | paste | code',
    paste_data_images: false,
    height: 640,
    resize: 'both',
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
    this.api.saveContentBlock(this.key, this.contentHtml);
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
}
