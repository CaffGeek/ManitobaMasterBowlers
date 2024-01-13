import { Component, Input, OnInit } from '@angular/core';
import { TournamentUploadRecord } from '@models/TournamentUploadRecord';

@Component({
  selector: 'app-tournament-upload-page',
  templateUrl: './tournament-upload-page.component.html',
  styleUrls: ['./tournament-upload-page.component.css']
})
export class TournamentUploadPageComponent implements OnInit {
  @Input() tournament: number;
  tournamentResults: TournamentUploadRecord[] = [];
  
  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  tournamentUploaded(tournamentResults: TournamentUploadRecord[]) {
    this.tournamentResults = [...tournamentResults];
  }
}
