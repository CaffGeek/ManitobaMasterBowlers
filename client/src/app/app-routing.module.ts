import { AuthGuard } from '@auth0/auth0-angular';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlMatchResult, UrlSegment } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { TournamentPageComponent } from '@pages/tournament-page/tournament-page.component';
import { ErrorComponent } from '@pages/error/error.component';
import { TournamentUploadPageComponent } from '@pages/tournament-upload-page/tournament-upload-page.component';
import { TournamentEditPageComponent } from '@pages/tournament-edit-page/tournament-edit-page.component';
import { BowlerPageComponent } from '@pages/bowler-page/bowler-page.component';
import { BowlerResultsComponent } from '@components/bowler-results/bowler-results.component';
import { TournamentSummaryComponent } from '@components/tournament-summary/tournament-summary.component';
import { TournamentViewerComponent } from '@components/tournament-viewer/tournament-viewer.component';
import { BowlerStatsComponent } from '@components/bowler-stats/bowler-stats.component';
import { SchedulePageComponent } from '@pages/schedule-page/schedule-page.component';
import { ContentBlocksPageComponent } from '@pages/content-blocks-page/content-blocks-page.component';
import { ContentBlockListComponent } from '@components/content-block-list/content-block-list.component';
import { ContentBlockEditorComponent } from '@components/content-block-editor/content-block-editor.component';
import { ContentPageComponent } from '@pages/content-page/content-page.component';
import { PermissionGuard } from './guards/permission.guard';
import { PERMISSION } from '@services/permission.service';
import { SitemapPageComponent } from '@pages/sitemap-page/sitemap-page.component';

const aspxMatcher = (segments: UrlSegment[]): UrlMatchResult | null => {
  if (segments.length !== 1) {
    return null;
  }

  const segment = segments[0].path;
  if (!segment.toLowerCase().endsWith('.aspx')) {
    return null;
  }

  const blockKey = segment.slice(0, -5);
  return {
    consumed: segments,
    posParams: {
      blockKey: new UrlSegment(blockKey, {}),
    },
  };
};

// https://stackblitz.com/run?file=src/app/app-routing.module.ts
const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'schedule',
    component: SchedulePageComponent,
  },
  {
    path: 'sitemap',
    component: SitemapPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { requiredPermission: PERMISSION.EDIT_SITEMAP },
  },
  {
    matcher: aspxMatcher,
    component: ContentPageComponent,
  },
  {
    path: 'content/:blockKey',
    component: ContentPageComponent,
  },
  {
    path: 'contentblocks',
    component: ContentBlocksPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { requiredPermission: PERMISSION.EDIT_SITEMAP },
    children: [
      { path: '', component: ContentBlockListComponent, outlet: "list" },
    ]
  },
  {
    path: 'contentblocks/:key',
    component: ContentBlocksPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { requiredPermission: PERMISSION.EDIT_SITEMAP },
    children: [
      { path: '', component: ContentBlockListComponent, outlet: "list" },
      { path: '', component: ContentBlockEditorComponent, outlet: "editor" },
    ]
  },
  {
    path: 'results/:division',
    component: TournamentPageComponent,
  },
  {
    path: 'results/:division/:season',
    component: TournamentPageComponent,
    children: [
      { path: '0', component: TournamentSummaryComponent },
      { path: ':tournament', component: TournamentViewerComponent },
      { path: ':tournament/upload', component: TournamentUploadPageComponent, pathMatch: 'full', canActivate: [AuthGuard], },
      { path: ':tournament/edit', component: TournamentEditPageComponent, pathMatch: 'full', canActivate: [AuthGuard], },
    ]
  },
  {
    path: 'bowlers/:bowler',
    component: BowlerPageComponent,
    children: [
      { path: '', component: BowlerStatsComponent, outlet: "stats" },
      { path: '', component: BowlerResultsComponent, outlet: "results" },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true,
    paramsInheritanceStrategy: 'always',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
