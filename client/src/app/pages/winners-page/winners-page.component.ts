import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

type StarWinnerRecord = {
  BowlerId: number;
  Bowler: string;
  SeasonDesc: string;
  Division: string;
  TournamentId: number;
  TournamentNumber: number;
  TournamentLocation: string;
  TournamentDetails: string;
};

@Component({
  selector: 'app-winners-page',
  templateUrl: './winners-page.component.html',
  styleUrls: ['./winners-page.component.css'],
  standalone: false,
})
export class WinnersPageComponent implements OnInit, AfterViewInit {
  displayedColumns: (keyof StarWinnerRecord)[] = [
    'Bowler',
    'SeasonDesc',
    'Division',
    'TournamentNumber',
    'TournamentLocation',
    'TournamentDetails',
  ];
  dataSource = new MatTableDataSource<StarWinnerRecord>([]);

  @ViewChild(MatSort) sort?: MatSort;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'TournamentDetails') {
        return this.parseDate(item.TournamentDetails);
      }
      return (item as any)[property] ?? '';
    };

    this.api.starWinners$().subscribe((rows) => {
      this.dataSource.data = rows || [];
    });
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
      this.sort.active = 'TournamentDetails';
      this.sort.direction = 'desc';
      this.sort.sortChange.emit({ active: 'TournamentDetails', direction: 'desc' });
    }
  }

  private parseDate(value: string): number {
    if (!value) {
      return 0;
    }
    return moment(value, ['DDMMMMY hh:mm:ss a', 'MMMMDDY hh:mm:ss a', 'MMM D YYYY h:mma']).valueOf() || 0;
  }
}
