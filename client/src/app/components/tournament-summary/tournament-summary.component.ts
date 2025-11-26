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

  tournaments: TournamentRecord[];
  tournamentSummary: SeasonSummaryRecord[] = [];

  constructor(
    private api: ApiService,
  ) {
  }

  isTournament(division: Division): boolean {
    return "Tournament".localeCompare(division.toString(), undefined, {sensitivity: 'base'}) === 0;
  }

  ngOnChanges(_changes: SimpleChanges): void {
    const scratchTotals: string[] = ['Scratch1', 'Scratch2', 'Scratch3', 'Scratch4', 'Scratch5', 'Scratch6'];
    const poaTotals: string[] = ['POA1', 'POA2', 'POA3', 'POA4', 'POA5', 'POA6'];
    const scratchColumns: string[] = ['Pos', 'Bowler', ...scratchTotals, 'Top4Scratch', 'Top3Scratch'];
    const poaColumns: string[] = ['Pos', 'Bowler', ...poaTotals, 'Top4POA', 'Top3POA'];

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
    this.resort();
  }

  filterData() {
    this.dataSource.data = this.tournamentSummary
      .filter(x => !this.genderFilter || x.Gender.localeCompare(this.genderFilter, undefined, {sensitivity: 'base'}) === 0);
  }

  resort() {
    this.isTournament(this.division)
        ? this.sort.sort(({ id: 'Top4Scratch', start: 'desc'}) as MatSortable)
        : this.sort.sort(({ id: 'Top4POA', start: 'desc'}) as MatSortable);

    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property.toLocaleLowerCase()) {
        case 'top3scratch': return item.topNScratch(3);
        case 'top4scratch': return item.topNScratch(4);
        case 'top3poa': return item.topNPoa(3);
        case 'top4poa': return item.topNPoa(4);
        default: return item[property];
      }
    };
  }

  exportCsv() {
    const rows = this.dataSource.filteredData?.length ? this.dataSource.filteredData : this.dataSource.data;
    exportToCsv('tournament-summary.csv', this.displayedColumns, rows);
  }
}
