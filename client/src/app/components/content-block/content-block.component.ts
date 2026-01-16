import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.css'],
  standalone: false,
})
export class ContentBlockComponent implements OnChanges, OnDestroy {
  @Input() key: string;
  content;
  private contentSub?: Subscription;

  constructor(
    private api: ApiService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.key) {
      this.loadContent();
    }
  }

  ngOnDestroy(): void {
    this.contentSub?.unsubscribe();
  }

  private loadContent(): void {
    this.contentSub?.unsubscribe();
    this.content = '';
    if (!this.key) {
      return;
    }

    this.contentSub = this.api.contentBlocks$(this.key).subscribe((blocks) => {
      const latest = blocks.slice(-1)[0];
      this.content = latest ? latest.ContentHTML : '';
    });
  }

}
