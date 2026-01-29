import { Component, Input, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { BowlerResultsRecord } from '@models/BowlerResultsRecord';
import { ApiService } from '@services/api.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-bowler-stats',
  templateUrl: './bowler-stats.component.html',
  styleUrls: ['./bowler-stats.component.css'],
  standalone: false,
})
export class BowlerStatsComponent implements OnInit {
  @Input() bowler: number;

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  stats = {
    playingAverage: 0,
    careerAverage: 0,
    wins: 0,
    highGame: 0,
    highSet: 0,
    tournaments: 0,
    games: 0,
    totalPinfall: 0,
    careerAverageTeaching: 0,
    careerAverageTournament: 0,
    careerAverageSeniors: 0,
  };

  showCalc = false;
  leagueAverageInput: number | null = null;
  masterCalc = {
    tournamentsCount: 0,
    gamesCount: 0,
    pinfall: 0,
    missingEvents: 0,
    paddedPinfall: 0,
    combinedGames: 0,
    combinedAverage: null as number | null,
  };

  constructor(
    private api: ApiService,
  ) {
  }
  
  ngOnInit(): void {
    combineLatest([
      this.api.bowlerResults$(this.bowler),
      this.api.memberAverages$(this.bowler),
    ]).subscribe(([data, averages]) => {
      const results = data
        .sort((a, b) => b.date().valueOf() - a.date().valueOf())

      this.stats.tournaments = results.length;
      this.stats.highSet = results.map(x => x.Game1 + x.Game2 + x.Game3 + x.Game4 + x.Game5 + x.Game6 + x.Game7 + x.Game8).reduce((a, b) => Math.max(a, b), 0);
      this.stats.highGame = results.map(x => Math.max(x.Game1, x.Game2, x.Game3, x.Game4, x.Game5, x.Game6, x.Game7, x.Game8)).reduce((a, b) => Math.max(a, b), 0);
      this.stats.wins = results.filter((x) => !!x.WonStars).length;
      this.stats.games = this.countGames(results);
      this.stats.totalPinfall = this.sumGames(results);
      this.stats.careerAverage = Math.trunc(this.stats.totalPinfall / this.stats.games);

      const masterRecord = averages?.[0];
      this.masterCalc.tournamentsCount = masterRecord?.events ?? 0;
      this.masterCalc.gamesCount = masterRecord?.games ?? 0;
      this.masterCalc.pinfall = masterRecord?.pinfall ?? 0;
      this.updateMasterAverage();
    });
  }

  onLeagueAverageChange() {
    this.updateMasterAverage();
  }

  private updateMasterAverage() {
    const missingEvents = Math.max(0, 10 - this.masterCalc.tournamentsCount);
    this.masterCalc.missingEvents = missingEvents;
    this.masterCalc.paddedPinfall = this.leagueAverageInput && missingEvents
      ? this.leagueAverageInput * 8 * missingEvents
      : 0;
    this.masterCalc.combinedGames = this.masterCalc.gamesCount + (missingEvents * 8);

    if (missingEvents === 0) {
      this.masterCalc.combinedAverage = Math.trunc(this.masterCalc.pinfall / this.masterCalc.gamesCount);
      this.stats.playingAverage = this.masterCalc.combinedAverage;
      return;
    }

    if (this.leagueAverageInput && this.leagueAverageInput > 0 && this.masterCalc.combinedGames > 0) {
      this.masterCalc.combinedAverage = Math.trunc(
        (this.masterCalc.pinfall + this.masterCalc.paddedPinfall) / this.masterCalc.combinedGames
      );
      this.stats.playingAverage = this.masterCalc.combinedAverage;
    } else {
      this.masterCalc.combinedAverage = null;
      this.stats.playingAverage = null;
    }
  }

  countGames = (results: any[]): number => {
    return results.map(x => 
      (!!x.Game1 ? 1 : 0) + 
      (!!x.Game2 ? 1 : 0) + 
      (!!x.Game3 ? 1 : 0) + 
      (!!x.Game4 ? 1 : 0) + 
      (!!x.Game5 ? 1 : 0) + 
      (!!x.Game6 ? 1 : 0) + 
      (!!x.Game7 ? 1 : 0) + 
      (!!x.Game8 ? 1 : 0))
      .reduce((a, b) => a + b, 0);
  }

  sumGames = (results: any[]): number => {
    return results.map(x => x.Game1 + x.Game2 + x.Game3 + x.Game4 + x.Game5 + x.Game6 + x.Game7 + x.Game8).reduce((a, b) => a + b, 0);
  }
}
