import { Division } from './../../models/types/Division';
import { Component, Input, ViewChild, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '@services/api.service';
import { PERMISSION, PermissionService } from '@services/permission.service';
import { exportToCsv } from '../../utils/export-to-csv';

@Component({
  selector: 'app-tournament-viewer',
  templateUrl: './tournament-viewer.component.html',
  styleUrls: ['./tournament-viewer.component.css'],
  standalone: false,
})
export class TournamentViewerComponent implements OnChanges, OnInit {
  @Input() division: Division;
  @Input() season: string;
  @Input() tournament: number;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource([]);
  canEditTournament: boolean = false;

  constructor(
    public permissions: PermissionService,
    private api: ApiService,
  ) {
  }

  isTournament(division: Division): boolean {
    return "Tournament".localeCompare(division.toString(), undefined, {sensitivity: 'base'}) === 0;
  }

  ngOnInit(): void {
    //TODO: CHAD: can probably move to auth route guard somehow with the permissions???
    this.permissions.checkPermission(PERMISSION.EDIT_TOURNAMENT)
      .subscribe((canEdit) => { this.canEditTournament = canEdit });
  }

  ngOnChanges(_changes: SimpleChanges): void {
    const games: string[] = ['Game1', 'Game2', 'Game3', 'Game4', 'Game5', 'Game6', 'Game7', 'Game8'];
    const scratchColumns: string[] = ['Pos', 'Bowler', ...games, 'Scratch'];
    const poaColumns: string[] = ['Pos', 'Bowler', 'Average', ...games, 'Scratch', 'POA'];
    
    this.api.tournamentResults$(this.tournament).subscribe((results) => {
      this.displayedColumns = this.isTournament(this.division)
        ? scratchColumns
        : poaColumns;

      this.dataSource.data = this.isTournament(this.division)
        ? results.sort((x, y) => y.scratch() - x.scratch())
        : results.sort((x, y) => y.poa() - x.poa());
    });
  }

  ngAfterViewInit() {
    this.isTournament(this.division)
        ? this.sort.sort(({ id: 'Scratch', start: 'desc'}) as MatSortable)
        : this.sort.sort(({ id: 'POA', start: 'desc'}) as MatSortable);

    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property.toLocaleLowerCase()) {
        case 'scratch': return item.scratch();
        case 'poa': return item.poa();
        default: return item[property];
      }
    };
  }

  exportCsv() {
    const rows = this.dataSource.filteredData?.length ? this.dataSource.filteredData : this.dataSource.data;
    exportToCsv('tournament-results.csv', this.displayedColumns, rows);
  }
}
