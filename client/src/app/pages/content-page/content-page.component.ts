import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css'],
  standalone: false,
})
export class ContentPageComponent implements OnInit, OnDestroy {
  blockKey = '';
  private routeSub?: Subscription;

  constructor(private route: ActivatedRoute) {}

  get sidebarKey(): string {
    return this.blockKey ? `${this.blockKey}_sidebar` : '';
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      this.blockKey = params.get('blockKey') ?? '';
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
