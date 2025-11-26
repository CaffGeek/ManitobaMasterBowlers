import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.css'],
  standalone: false,
})
export class ContentBlockComponent implements OnInit {
  @Input() key: string;
  content;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.contentBlocks$(this.key).subscribe((blocks) => {
        this.content = blocks.slice(-1)[0].ContentHTML;
    });
  }

}
