import { Component, Input, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { BowlerResultsRecord } from '@models/BowlerResultsRecord';
import { ApiService } from '@services/api.service';

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
    this.api.bowlerResults$(this.bowler).subscribe((data) => {
      const results = data
        .sort((a, b) => b.date().valueOf() - a.date().valueOf())

      this.stats.tournaments = results.length;
      this.stats.highSet = results.map(x => x.Game1 + x.Game2 + x.Game3 + x.Game4 + x.Game5 + x.Game6 + x.Game7 + x.Game8).reduce((a, b) => Math.max(a, b), 0);
      this.stats.highGame = results.map(x => Math.max(x.Game1, x.Game2, x.Game3, x.Game4, x.Game5, x.Game6, x.Game7, x.Game8)).reduce((a, b) => Math.max(a, b), 0);
      this.stats.games = this.countGames(results);
      this.stats.totalPinfall = this.sumGames(results);
      this.stats.careerAverage = Math.trunc(this.stats.totalPinfall / this.stats.games);

      // Masters Average: last 10 tournaments, current season + previous 4 seasons, ignoring flagged tournaments
      const filtered = this.limitSeasons(results, 5).filter(r => !r.IgnoreForAverage);
      const { tournamentsCount, gamesCount, pinfall } = this.takeLatestTournaments(filtered, 10);
      this.masterCalc.tournamentsCount = tournamentsCount;
      this.masterCalc.gamesCount = gamesCount;
      this.masterCalc.pinfall = pinfall;
      this.updateMasterAverage();

      //TODO: CHAD: Wins
    });
  }

  // TODO: CHAD: This needs to be shared, but also, use actual seasons, not just this bowlers
  private limitSeasons = (results: BowlerResultsRecord[], seasonsToKeep: number) => {
    const seasonOrder = Array.from(new Set(results.map(r => r.SeasonCode))).sort((a, b) => b - a);
    const allowed = new Set(seasonOrder.slice(0, seasonsToKeep));
    return results.filter(r => allowed.has(r.SeasonCode));
  }

  private takeLatestTournaments = (results: BowlerResultsRecord[], tournamentsNeeded: number) => {
    const slice = results.slice(0, tournamentsNeeded);
    const pinfall = slice.reduce((sum, res) =>
      sum + [res.Game1, res.Game2, res.Game3, res.Game4, res.Game5, res.Game6, res.Game7, res.Game8]
        .filter(g => g && g > 0)
        .reduce((a, b) => a + b, 0), 0);
    const gamesCount = slice.reduce((sum, res) =>
      sum + [res.Game1, res.Game2, res.Game3, res.Game4, res.Game5, res.Game6, res.Game7, res.Game8]
        .filter(g => g && g > 0).length, 0);
    return { tournamentsCount: slice.length, gamesCount, pinfall };
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
