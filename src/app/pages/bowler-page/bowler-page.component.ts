import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from '@services/api.service';
import moment from 'moment';

@Component({
  selector: 'app-bowler-page',
  templateUrl: './bowler-page.component.html',
  styleUrls: ['./bowler-page.component.css']
})
export class BowlerPageComponent implements OnChanges {
  @Input() bowler: number;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['Location', 'Date', 'Division', 'Number', 'Game1', 'Game2', 'Game3', 'Game4', 'Game5', 'Game6', 'Game7', 'Game8'];
  dataSource = new MatTableDataSource([]);
  
  constructor(
    public auth: AuthService,
    private api: ApiService,
  ) {
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.api.bowlerResults$(this.bowler).subscribe((results) => {

      results.sort((a, b) => b.TournamentId - a.TournamentId)

      this.dataSource.data = results
      //TODO: CHAD: .map(x => Object.assign(new an(), x));
        .map(x => {
          return {
            ...x,
            Date: moment(x.TournamentDetails, ['DDMMMMY', 'MMMMDDY']).toDate(),
          };
        })
    });
  }
}
