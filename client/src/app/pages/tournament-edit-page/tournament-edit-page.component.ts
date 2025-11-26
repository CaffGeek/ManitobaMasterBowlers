import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TournamentUploadRecord } from '@models/TournamentUploadRecord';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-tournament-edit-page',
  templateUrl: './tournament-edit-page.component.html',
  styleUrls: ['./tournament-edit-page.component.css'],
  standalone: false,
})
export class TournamentEditPageComponent implements OnChanges {
  @Input() tournament: number;
  tournamentResults: TournamentUploadRecord[] = [];
  
  constructor(
    private api: ApiService,
  ) {
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.api.tournamentResults$(this.tournament).subscribe((results) => {
      this.tournamentResults = results;
    });
  }

}
