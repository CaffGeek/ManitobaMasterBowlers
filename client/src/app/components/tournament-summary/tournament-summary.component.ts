import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SeasonSummaryRecord } from '@models/SeasonSummaryRecord';
import { TournamentRecord } from '@models/TournamentRecord';
import { Division } from '@models/types/Division';
import { ApiService } from '@services/api.service';
import { forkJoin } from 'rxjs';
import { exportToCsv } from '../../utils/export-to-csv';

@Component({
  selector: 'app-tournament-summary',
  templateUrl: './tournament-summary.component.html',
  styleUrls: ['./tournament-summary.component.css'],
  standalone: false,
})
export class TournamentSummaryComponent implements OnChanges {
  @Input() division: Division;
  @Input() season: string;

  @ViewChild(MatSort) sort: MatSort;

  genderFilter = '';
  genders = [{
    value: '',
    name: 'All',
  }, {
    value: 'M',
    name: 'Mens',
  }, {
    value:  'L',
    name: 'Womens',
  }];

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource([]);
  bestCount = 4;
  bestCountOptions = [5, 4, 3, 2];

  tournaments: TournamentRecord[];
  tournamentSummary: SeasonSummaryRecord[] = [];

  constructor(
    private api: ApiService,
  ) {
  }

  isTournament(division: Division): boolean {
    return "Tournament".localeCompare(division.toString(), undefined, {sensitivity: 'base'}) === 0;
  }

  isSenior(division: Division): boolean {
    return 'Senior'.localeCompare(division?.toString() || '', undefined, { sensitivity: 'base' }) === 0;
  }

  get officialBestCount(): number {
    return this.isSenior(this.division) ? 3 : 4;
  }

  get defaultSelectableBestCount(): number {
    return this.isSenior(this.division) ? 4 : 5;
  }

  ngOnChanges(_changes: SimpleChanges): void {
    const scratchTotals: string[] = ['Scratch1', 'Scratch2', 'Scratch3', 'Scratch4', 'Scratch5', 'Scratch6'];
    const poaTotals: string[] = ['POA1', 'POA2', 'POA3', 'POA4', 'POA5', 'POA6'];
    const scratchColumns: string[] = ['Pos', 'Bowler', ...scratchTotals, 'OfficialBestScratch', 'BestScratch'];
    const poaColumns: string[] = ['Pos', 'Bowler', ...poaTotals, 'OfficialBestPOA', 'BestPOA'];

    this.bestCount = this.defaultSelectableBestCount;

    this.isTournament(this.division)
        ? this.displayedColumns = scratchColumns
        : this.displayedColumns = poaColumns;

    this.api.tournaments$().subscribe((tournaments) => {
      this.tournaments = tournaments
        .filter(x => x.Division.localeCompare(this.division, undefined, {sensitivity: 'base'}) === 0)
        .filter(x => x.SeasonCode === this.season);
        
      this.tournaments.sort((x, y) => x.TournamentNumber - y.TournamentNumber);

      const records = [];
      forkJoin([
        ...this.tournaments.map(tournament => this.api.tournamentResults$(tournament.Id))
      ]).subscribe((resultsList) => {
        resultsList.forEach((results) => {
          const tournament = this.tournaments.find(x => x.Id === results[0]?.TournamentId);
          if (!tournament) return;

          results
            //.filter(x => !this.genderFilter || x.Gender.localeCompare(this.genderFilter, undefined, {sensitivity: 'base'}) === 0)
            .forEach((x) => {
            const existingRecord = records.find(z => z.BowlerId === x.BowlerId);
            if (existingRecord) {
              existingRecord[`Scratch${tournament.TournamentNumber}`] = x.scratch();
              existingRecord[`POA${tournament.TournamentNumber}`] = x.poa();
            } else {
              records.push(Object.assign(new SeasonSummaryRecord(), {
                ...records[x.BowlerId],
                BowlerId: x.BowlerId,
                Bowler: x.Bowler,
                Gender: x.Gender,
                [`Scratch${tournament.TournamentNumber}`]: x.scratch(),
                [`POA${tournament.TournamentNumber}`]: x.poa(),
              }).ensureTypes());
            }
          });
        });

        this.tournamentSummary = records;
        this.dataSource.data = this.tournamentSummary;
      });
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.resort());
  }

  filterData() {
    this.dataSource.data = this.tournamentSummary
      .filter(x => !this.genderFilter || x.Gender.localeCompare(this.genderFilter, undefined, {sensitivity: 'base'}) === 0);
  }

  onBestCountChange() {
    this.resort();
  }

  resort() {
    const defaultColumn = this.isTournament(this.division)
      ? 'BestScratch'
      : 'BestPOA';

    this.dataSource.sort = this.sort;
    this.sort.active = defaultColumn;
    this.sort.direction = 'desc';
    this.sort.sortChange.emit({ active: defaultColumn, direction: 'desc' });

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property.toLocaleLowerCase()) {
        case 'officialbestscratch': return item.topNScratch(this.officialBestCount);
        case 'bestscratch': return item.topNScratch(this.bestCount);
        case 'officialbestpoa': return item.topNPoa(this.officialBestCount);
        case 'bestpoa': return item.topNPoa(this.bestCount);
        default: return item[property];
      }
    };
  }

  exportCsv() {
    const rows = this.dataSource.filteredData?.length ? this.dataSource.filteredData : this.dataSource.data;
    const officialColumn = this.isTournament(this.division) ? 'OfficialBestScratch' : 'OfficialBestPOA';
    const bestColumn = this.isTournament(this.division) ? 'BestScratch' : 'BestPOA';
    const exportColumns = this.displayedColumns.map((column) => {
      if (column === officialColumn) {
        return `Best ${this.officialBestCount}`;
      }
      if (column === bestColumn) {
        return `Best ${this.bestCount}`;
      }
      return column;
    });
    const exportRows = rows.map((row) => ({
      ...row,
      [`Best ${this.officialBestCount}`]: this.isTournament(this.division)
        ? row.topNScratch(this.officialBestCount)
        : row.topNPoa(this.officialBestCount),
      [`Best ${this.bestCount}`]: this.isTournament(this.division)
        ? row.topNScratch(this.bestCount)
        : row.topNPoa(this.bestCount),
    }));

    exportToCsv('tournament-summary.csv', exportColumns, exportRows);
  }
}
