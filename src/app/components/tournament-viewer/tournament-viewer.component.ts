import { Component, Input, ViewChild, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TournamentResultsRecord } from '@models/TournamentResultsRecord';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-tournament-viewer',
  templateUrl: './tournament-viewer.component.html',
  styleUrls: ['./tournament-viewer.component.css']
})
export class TournamentViewerComponent implements OnChanges, OnInit {
  @Input() tournament: number;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['Bowler', 'Game1', 'Game2', 'Game3', 'Game4', 'Game5', 'Game6', 'Game7', 'Game8', 'Scratch', 'POA'];
  dataSource = new MatTableDataSource([]);

  constructor(
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    this.api.tournamentResults$(this.tournament).subscribe((results) => {
      this.dataSource.data = results
        .map(x => Object.assign(new TournamentResultsRecord(), x));
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = changes.results.currentValue
      .map((x, i) => { x.ID = i; return x; });// TODO: CHAD: Need to lookup Proper ID
  }
  
  ngAfterViewInit() {
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
