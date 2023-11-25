import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeasonRecord } from '@models/SeasonRecord';
import { TournamentRecord } from '@models/TournamentRecord';
import { TournamentUploadRecord } from '@models/TournamentUploadRecord';
import { ApiService } from '@services/api.service';
import { Subscription, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.css']
})
export class TournamentPageComponent implements OnInit, OnDestroy {
  @Input() division;
  @Input() season;

  tournamentResults: TournamentUploadRecord[] = [];
  seasons: SeasonRecord[];
  tournaments: TournamentRecord[];

  season$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
  }

  ngOnDestroy(): void {
    this.season$.unsubscribe();
  }

  ngOnInit(): void {
    this.api.seasons$().subscribe((seasons) => {
      this.seasons = seasons
        .map(x => Object.assign(new SeasonRecord(), x)); //TODO: CHAD: Move to service?
      this.seasons.sort((x, y) => x.SeasonDesc.localeCompare(y.SeasonDesc) * -1);

      if (!this.route.snapshot.params['season']) {
        this.changeSeason(this.seasons[0].SeasonCode);
      }
    });
    
    this.season$ = this.route.params.pipe(map(x => x.season)).subscribe(this.onSeasonChange);
  }

  changeSeason = (seasonCode) => {
    this.router.navigate(['/results', this.division, seasonCode]);
  }

  changeTournament = (tournament) => {
    this.router.navigate(['/results', this.division, this.season, tournament]);
  }

  onSeasonChange = (seasonCode: string) => {
    this.api.tournaments$().subscribe((tournaments) => {
      this.tournaments = tournaments
        .map(x => Object.assign(new TournamentRecord(), x)) //TODO: CHAD: Move to service?
        .filter(x => x.Division.localeCompare(this.division, undefined, {sensitivity: 'base'}) === 0)
        .filter(x => x.SeasonCode === seasonCode);
        
      this.tournaments.sort((x, y) => x.TournamentNumber - y.TournamentNumber);
    });
  }
}
