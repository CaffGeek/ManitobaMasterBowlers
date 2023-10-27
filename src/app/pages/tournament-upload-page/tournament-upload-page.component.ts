import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentUploadRecord } from '@models/TournamentUploadRecord';
import { ApiService } from '@services/api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-tournament-upload-page',
  templateUrl: './tournament-upload-page.component.html',
  styleUrls: ['./tournament-upload-page.component.css']
})
export class TournamentUploadPageComponent implements OnInit {
  tournamnetId: number;
  tournamentResults: TournamentUploadRecord[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {

  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params.tournamnetId),
      distinctUntilChanged(),
    ).subscribe(tournamnetId => this.tournamnetId = tournamnetId);
  }

  tournamentUploaded(tournamentResults: TournamentUploadRecord[]) {
    this.tournamentResults = [...tournamentResults];
  }
}
