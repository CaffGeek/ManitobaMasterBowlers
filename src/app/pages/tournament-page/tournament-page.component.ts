import { Component } from '@angular/core';

@Component({
  selector: 'app-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.css']
})
export class TournamentPageComponent {
  tournamentResults = [];
  
  tournamentUploaded(tournamentResults) {
    this.tournamentResults = tournamentResults;
  }
}
