import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@auth0/auth0-angular';
import { BowlerResultsRecord } from '@models/BowlerResultsRecord';
import { ApiService } from '@services/api.service';
import moment from 'moment';

@Component({
  selector: 'app-bowler-results',
  templateUrl: './bowler-results.component.html',
  styleUrls: ['./bowler-results.component.css']
})
export class BowlerResultsComponent implements OnChanges {
  @Input() bowler: number;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['TournamentLocation', 'Date', 'Division', 'TournamentNumber', 'Game1', 'Game2', 'Game3', 'Game4', 'Game5', 'Game6', 'Game7', 'Game8', 'Scratch', 'BowlerAverage', 'POA'];
  dataSource = new MatTableDataSource([]);
  
  constructor(
    public auth: AuthService,
    private api: ApiService,
  ) {
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.api.bowlerResults$(this.bowler).subscribe((results) => {

      this.dataSource.data = results
        .map(x => Object.assign(new BowlerResultsRecord(), x).ensureTypes()) //TODO: CHAD: Move to service?
        .sort((a, b) => b.date() - a.date())
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
}