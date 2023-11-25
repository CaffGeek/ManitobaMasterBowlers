import { AuthGuard } from '@auth0/auth0-angular';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { TournamentPageComponent } from '@pages/tournament-page/tournament-page.component';
import { ErrorComponent } from '@pages/error/error.component';
import { TournamentUploadPageComponent } from '@pages/tournament-upload-page/tournament-upload-page.component';
import { BowlerPageComponent } from '@pages/bowler-page/bowler-page.component';
import { BowlerResultsComponent } from '@components/bowler-results/bowler-results.component';
import { TournamentSummaryComponent } from '@components/tournament-summary/tournament-summary.component';
import { TournamentViewerComponent } from '@components/tournament-viewer/tournament-viewer.component';
import { BowlerStatsComponent } from '@components/bowler-stats/bowler-stats.component';

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
    path: 'results/:division',
    component: TournamentPageComponent,
  },
  {
    path: 'results/:division/:season',
    component: TournamentPageComponent,
    children: [
      { path: '', component: TournamentSummaryComponent },
      { path: '0', redirectTo: '' },
      { path: ':tournament', component: TournamentViewerComponent },
      { path: ':tournament/upload', component: TournamentUploadPageComponent, pathMatch: 'full', canActivate: [AuthGuard]},
    ]
  },
  {
    path: 'bowlers/:bowler',
    component: BowlerPageComponent,
    children: [
      {path: '', component: BowlerStatsComponent, outlet: "stats" },
      {path: '', component: BowlerResultsComponent, outlet: "results" },
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
