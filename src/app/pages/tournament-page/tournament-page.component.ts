import { Component } from '@angular/core';
import { TournamentUploadRecord } from 'src/app/models/TournamentUploadRecord.model';

@Component({
  selector: 'app-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.css']
})
export class TournamentPageComponent {
  tournamentResults: TournamentUploadRecord[] = [];
  
  tournamentUploaded(tournamentResults: TournamentUploadRecord[]) {
    console.log('updating');
    this.tournamentResults = [...tournamentResults];
  }
}
