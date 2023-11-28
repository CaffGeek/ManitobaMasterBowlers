import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tournament-summary',
  templateUrl: './tournament-summary.component.html',
  styleUrls: ['./tournament-summary.component.css']
})
export class TournamentSummaryComponent {
  @Input() division;
  @Input() season;

}
