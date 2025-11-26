import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@auth0/auth0-angular';
import { BowlerResultsRecord } from '@models/BowlerResultsRecord';
import { ApiService } from '@services/api.service';
import { exportToCsv } from '../../utils/export-to-csv';
import moment from 'moment';

type ResultsRow = BowlerResultsRecord & { countsForAverage: boolean };

@Component({
  selector: 'app-bowler-results',
  templateUrl: './bowler-results.component.html',
  styleUrls: ['./bowler-results.component.css'],
  standalone: false,
})
export class BowlerResultsComponent implements OnChanges {
  @Input() bowler: number;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['TournamentLocation', 'Date', 'Division', 'TournamentNumber', 'Game1', 'Game2', 'Game3', 'Game4', 'Game5', 'Game6', 'Game7', 'Game8', 'Scratch', 'BowlerAverage', 'POA'];
  dataSource = new MatTableDataSource<ResultsRow>([]);
  
  constructor(
    public auth: AuthService,
    private api: ApiService,
  ) {
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.api.bowlerResults$(this.bowler).subscribe((results) => {
      const sorted = [...results].sort((a, b) => b.date().valueOf() - a.date().valueOf());
      const seasonOrder = Array.from(new Set(sorted.map(r => r.SeasonCode))).sort((a, b) => b - a);
      const allowedSeasons = new Set(seasonOrder.slice(0, 5));

      // Determine which tournaments contribute to the masters average (latest 10 eligible tournaments)
      const eligible = sorted.filter(r => allowedSeasons.has(r.SeasonCode) && !r.IgnoreForAverage);
      const includedTournamentIds = new Set<number>(eligible.slice(0, 10).map(r => r.TournamentId));

      this.dataSource.data = sorted.map(r => {
        const countsForAverage = includedTournamentIds.has(r.TournamentId) && allowedSeasons.has(r.SeasonCode) && !r.IgnoreForAverage;
        return Object.assign(new BowlerResultsRecord(), r, { countsForAverage });
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property.toLocaleLowerCase()) {
        case 'date': return item.date();
        case 'scratch': return item.scratch();
        case 'poa': return item.poa();
        default: return item[property];
      }
    };
  }

  exportCsv() {
    const rows = this.dataSource.filteredData?.length ? this.dataSource.filteredData : this.dataSource.data;
    exportToCsv('bowler-results.csv', this.displayedColumns, rows);
  }
}
