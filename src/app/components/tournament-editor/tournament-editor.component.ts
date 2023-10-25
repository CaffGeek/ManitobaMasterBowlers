import { Component, Input, OnChanges, SimpleChanges, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '@services/api.service';
import { BowlerRecord } from '@models/BowlerRecord';
import { TournamentUploadRecord } from '@models/TournamentUploadRecord';

@Component({
  selector: 'app-tournament-editor',
  templateUrl: './tournament-editor.component.html',
  styleUrls: ['./tournament-editor.component.css']
})
export class TournamentEditorComponent implements OnInit, OnChanges {
  @Input() results: TournamentUploadRecord[] = [];
  bowlers: BowlerRecord[];

  constructor(
    private api: ApiService,
  ) {

  }

  ngOnInit(): void {
    this.api.bowlers$().subscribe((bowlers) => {
      this.bowlers = bowlers.map(x => Object.assign(new BowlerRecord(), x));
      this.bowlers.sort((x, y) => x.Name.localeCompare(y.Name));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = changes.results.currentValue;
  }

  displayedColumns: string[] = ['Bowler', 'Game1', 'Game2', 'Game3', 'Game4', 'Game5', 'Game6', 'Game7', 'Game8', 'Scratch', 'POA'];
  dataSource = new MatTableDataSource(this.results);
  
  @ViewChild(MatSort) sort: MatSort;

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
