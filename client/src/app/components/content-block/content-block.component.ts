import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Observable, Subscription, of, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { PermissionService, PERMISSION } from '@services/permission.service';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.css'],
  standalone: false,
})
export class ContentBlockComponent implements OnInit, OnChanges, OnDestroy {
  @Input() key: string;
  content;
  showEditor = false;
  canEdit$: Observable<boolean>;
  private contentSub?: Subscription;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private permissions: PermissionService,
  ) { }

  ngOnInit(): void {
    this.canEdit$ = this.auth.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          return of(false);
        }

        return this.permissions.checkPermission(PERMISSION.EDIT_SITEMAP);
      })
    );
  }

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

  toggleEditor(): void {
    this.showEditor = !this.showEditor;
    if (!this.showEditor) {
      this.loadContent();
    }
  }

}
