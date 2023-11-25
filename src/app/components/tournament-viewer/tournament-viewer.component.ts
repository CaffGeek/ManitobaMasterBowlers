import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@auth0/auth0-angular';
import { TournamentResultsRecord } from '@models/TournamentResultsRecord';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-tournament-viewer',
  templateUrl: './tournament-viewer.component.html',
  styleUrls: ['./tournament-viewer.component.css']
})
export class TournamentViewerComponent implements OnChanges {
  @Input() division: string;
  @Input() season: string;
  @Input() tournament: number;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource([]);

  constructor(
    public auth: AuthService,
    private api: ApiService,
  ) {
  }

  ngOnChanges(_changes: SimpleChanges): void {
    const games: string[] = ['Game1', 'Game2', 'Game3', 'Game4', 'Game5', 'Game6', 'Game7', 'Game8'];
    const scratchColumns: string[] = ['Pos', 'Bowler', ...games, 'Scratch'];
    const poaColumns: string[] = ['Pos', 'Bowler', 'Average', ...games, 'Scratch', 'POA'];
    
    this.api.tournamentResults$(this.tournament).subscribe((results) => {
      this.displayedColumns = ("Tournament".localeCompare(this.division, undefined, {sensitivity: 'base'}) === 0)
        ? scratchColumns
        : poaColumns;

      this.dataSource.data = results
        .map(x => Object.assign(new TournamentResultsRecord(), x)); //TODO: CHAD: Move to service?
    });
  }

  ngAfterViewInit() {
    ("Tournament".localeCompare(this.division, undefined, {sensitivity: 'base'}) === 0)
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
}
