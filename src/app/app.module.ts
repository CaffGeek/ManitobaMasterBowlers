import { BowlerExistsValidatorDirective } from './components/bowler-exists-validator.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '@pages/home/home.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { ErrorComponent } from '@pages/error/error.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { UploadTournamentComponent } from './components/upload-tournament/upload-tournament.component';
import { TournamentPageComponent } from '@pages/tournament-page/tournament-page.component';
import { TournamentEditorComponent } from './components/tournament-editor/tournament-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AppendValuesPipe } from './pipes/append-values.pipe';
import { TournamentUploadPageComponent } from '@pages/tournament-upload-page/tournament-upload-page.component';
import { TournamentViewerComponent } from './components/tournament-viewer/tournament-viewer.component';
import { BowlerPageComponent } from './pages/bowler-page/bowler-page.component';
import { TournamentSummaryComponent } from './components/tournament-summary/tournament-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NavBarComponent,
    FooterComponent,
    HomeContentComponent,
    LoadingComponent,
    ErrorComponent,
    UploadTournamentComponent,
    TournamentPageComponent,
    TournamentEditorComponent,
    AppendValuesPipe,
    TournamentUploadPageComponent,
    TournamentViewerComponent,
    BowlerPageComponent,
    TournamentSummaryComponent,
    BowlerExistsValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    HighlightModule,
    FontAwesomeModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        ...env.httpInterceptor,
      },
    }),
    BrowserAnimationsModule,
    MatSortModule,
    MatTableModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: Window,
      useValue: window,
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          json: () => import('highlight.js/lib/languages/json'),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
