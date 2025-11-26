import { Component, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from '@services/api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TournamentRecord } from '@models/TournamentRecord';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css'],
  standalone: false,
})
export class ScheduleListComponent {
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ["TournamentDetails", "Division", "TournamentNumber", "TournamentLocation"];
  dataSource = new MatTableDataSource([]);
  latestSeason = '';
  
  constructor(
    public auth: AuthService,
    private api: ApiService,
  ) {
    this.api.tournaments$().subscribe((results) => {
      this.dataSource.data = results
        .filter(x => ['Teaching', 'Tournament', 'Senior'].includes(x.Division))
        .sort((a, b) => b.date().valueOf() - a.date().valueOf());

      this.latestSeason = results.map(x => x.SeasonCode).sort().reverse()?.[0] || '';
    });
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property.toLocaleLowerCase()) {
        default: return item[property];
      }
    };
  }

  isCurrentSeason = (row: TournamentRecord) => row.SeasonCode === this.latestSeason;
  isFutureTournament = (row: TournamentRecord) => row.SeasonCode === this.latestSeason && row.date().valueOf() > Date.now();
}
