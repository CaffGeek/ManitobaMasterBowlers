import { Component, Input, OnInit } from '@angular/core';
import { TournamentUploadRecord } from '@models/TournamentUploadRecord';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tournament-upload-page',
  templateUrl: './tournament-upload-page.component.html',
  styleUrls: ['./tournament-upload-page.component.css'],
  standalone: false,
})
export class TournamentUploadPageComponent implements OnInit {
  @Input() tournament: number;
  tournamentResults: TournamentUploadRecord[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  tournamentUploaded(tournamentResults: TournamentUploadRecord[]) {
    this.tournamentResults = [...tournamentResults];
  }

  onSaveCompleted() {
    this.router.navigate(['../edit'], { relativeTo: this.route });
  }
}
