import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-content-block-list',
  templateUrl: './content-block-list.component.html',
  styleUrls: ['./content-block-list.component.css']
})
export class ContentBlockListComponent implements OnInit {

  keys: string[] = [];

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.contentBlocks$().subscribe((blocks) => {
      this.keys = [...new Set(blocks.map(x => x.ContentBlock))].sort();
    });
  }

}
