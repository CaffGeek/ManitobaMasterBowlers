import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { exportToCsv } from '../../utils/export-to-csv';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

type MemberAverageRecord = {
  BowlerId: number;
  Name: string;
  pinfall: number;
  games: number;
  average: number;
  events: number;
  TeachingFlag: number;
  SeniorFlag: number;
  TournamentFlag: number;
};

@Component({
  selector: 'app-member-averages-page',
  templateUrl: './member-averages-page.component.html',
  styleUrls: ['./member-averages-page.component.css'],
  standalone: false,
})
export class MemberAveragesPageComponent implements OnInit, AfterViewInit {
  faCheck = faCheck;
  displayedColumns: string[] = [
    'Name',
    'TournamentFlag',
    'TeachingFlag',
    'SeniorFlag',
    'events',
    'games',
    'missingGames',
    'pinfall',
    'average',
    'leagueAverage',
    'mastersAverage',
  ];

  dataSource = new MatTableDataSource<MemberAverageRecord>([]);
  leagueAverages: Record<number, number | null> = {};
  filterDivision: 'all' | 'Tournament' | 'Teaching' | 'Senior' = 'all';

  @ViewChild(MatSort) sort?: MatSort;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'missingGames') {
        return this.getMissingGames(item);
      }
      if (property === 'mastersAverage') {
        return this.getMastersAverage(item) ?? 0;
      }
      if (property === 'leagueAverage') {
        return this.getLeagueAverage(item) ?? 0;
      }
      if (property === 'TournamentFlag') {
        return item.TournamentFlag;
      }
      if (property === 'TeachingFlag') {
        return item.TeachingFlag;
      }
      if (property === 'SeniorFlag') {
        return item.SeniorFlag;
      }
      return (item as any)[property] ?? '';
    };

    this.dataSource.filterPredicate = (row, filter) => {
      if (!filter || filter === 'all') {
        return true;
      }
      if (filter === 'Tournament') {
        return !!row.TournamentFlag;
      }
      if (filter === 'Teaching') {
        return !!row.TeachingFlag;
      }
      if (filter === 'Senior') {
        return !!row.SeniorFlag;
      }
      return true;
    };

    this.api.memberAverages$().subscribe((rows) => {
      this.dataSource.data = rows || [];
      this.applyFilter();
    });
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
      this.sort.active = 'Name';
      this.sort.direction = 'asc';
      this.sort.sortChange.emit({ active: 'Name', direction: 'asc' });
    }
  }

  getMissingGames(row: MemberAverageRecord): number {
    const missing = Math.max(0, 80 - (row.games || 0));
    return missing;
  }

  getLeagueAverage(row: MemberAverageRecord): number | null {
    const value = this.leagueAverages[row.BowlerId];
    return typeof value === 'number' && !Number.isNaN(value) ? value : null;
  }

  setLeagueAverage(row: MemberAverageRecord, value: string): void {
    const parsed = Number(value);
    this.leagueAverages[row.BowlerId] = Number.isFinite(parsed) ? parsed : null;
  }

  getMastersAverage(row: MemberAverageRecord): number | null {
    if (!row.games || !row.pinfall) {
      return null;
    }
    if (row.events >= 10) {
      return this.roundAverage(row.pinfall / row.games);
    }

    const leagueAvg = this.getLeagueAverage(row);
    if (leagueAvg === null) {
      return null;
    }

    const missingGames = this.getMissingGames(row);
    const paddedTotal = row.pinfall + missingGames * leagueAvg;
    const paddedGames = row.games + missingGames;
    if (!paddedGames) {
      return null;
    }
    return this.roundAverage(paddedTotal / paddedGames);
  }

  private roundAverage(value: number): number {
    return Math.floor(value);
  }

  applyFilter(): void {
    this.dataSource.filter = this.filterDivision;
  }

  exportCsv(): void {
    const columns = [...this.displayedColumns];
    const sourceRows = this.dataSource.filteredData?.length
      ? this.dataSource.filteredData
      : this.dataSource.data;

    const rows = sourceRows.map((row) => ({
      Name: row.Name,
      TournamentFlag: !!row.TournamentFlag,
      TeachingFlag: !!row.TeachingFlag,
      SeniorFlag: !!row.SeniorFlag,
      events: row.events,
      games: row.games,
      missingGames: this.getMissingGames(row),
      pinfall: row.pinfall,
      average: row.average,
      leagueAverage: this.getLeagueAverage(row),
      mastersAverage: this.getMastersAverage(row),
    }));

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const filename = `${yyyy}${mm}${dd}-MBAM-Averages.csv`;
    exportToCsv(filename, columns, rows);
  }
}
