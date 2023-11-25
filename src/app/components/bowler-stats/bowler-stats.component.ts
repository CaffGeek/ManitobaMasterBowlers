import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import moment from 'moment';

@Component({
  selector: 'app-bowler-stats',
  templateUrl: './bowler-stats.component.html',
  styleUrls: ['./bowler-stats.component.css']
})
export class BowlerStatsComponent implements OnInit {
  @Input() bowler: number;

  stats = {
    playingAverage: 0,
    careerAverage: 0,
    wins: 0,
    highGame: 0,
    highSet: 0,
    tournaments: 0,
    games: 0,
    totalPinfall: 0,
  };

  constructor(
    private api: ApiService,
  ) {
  }
  
  ngOnInit(): void {
    this.api.bowlerResults$(this.bowler).subscribe((data) => {
      const results = data
      //TODO: CHAD: .map(x => Object.assign(new an(), x));
        .map(x => {
          return {
            ...x,
            Date: moment(x.TournamentDetails, ['DDMMMMY', 'MMMMDDY']).toDate(),
          };
        }).sort((a, b) => b.Date - a.Date)

      this.stats.tournaments = results.length;
      this.stats.highSet = results.map(x => x.Game1 + x.Game2 + x.Game3 + x.Game4 + x.Game5 + x.Game6 + x.Game7 + x.Game8).reduce((a, b) => Math.max(a, b), 0);
      this.stats.highGame = results.map(x => Math.max(x.Game1, x.Game2, x.Game3, x.Game4, x.Game5, x.Game6, x.Game7, x.Game8)).reduce((a, b) => Math.max(a, b), 0);
      this.stats.games = this.countGames(results);
      this.stats.totalPinfall = this.sumGames(results);
      this.stats.careerAverage = Math.trunc(this.stats.totalPinfall / this.stats.games);

      //TODO: CHAD: Masters Average
      const lastTwelveTournaments = results.slice(0, 12);
      const lastTwelveGames = this.countGames(lastTwelveTournaments);
      const lastTwelvePinfall = this.sumGames(lastTwelveTournaments);
      this.stats.playingAverage = Math.trunc(lastTwelvePinfall / lastTwelveGames);
      console.log('last12', lastTwelvePinfall, lastTwelveGames);

      //TODO: CHAD: Wins
    });
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