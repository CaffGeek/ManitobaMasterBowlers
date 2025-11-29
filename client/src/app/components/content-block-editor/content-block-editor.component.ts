import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-content-block-editor',
  templateUrl: './content-block-editor.component.html',
  styleUrls: ['./content-block-editor.component.css'],
  standalone: false,
})
export class ContentBlockEditorComponent implements OnChanges, AfterViewInit {
  @Input() key: string;
  contentHtml = '';
  
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
}
