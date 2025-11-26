import { Component, Input, OnInit } from '@angular/core';
import { BowlerRecord } from '@models/BowlerRecord';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-bowler-page',
  templateUrl: './bowler-page.component.html',
  styleUrls: ['./bowler-page.component.css'],
  standalone: false,
})
export class BowlerPageComponent implements OnInit {
  @Input() bowler: number;
  data: BowlerRecord;

  constructor(
    private api: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.api.bowlers$().subscribe((bowlers) => {
      this.data = bowlers
        .filter(x => x.ID == this.bowler)?.[0] || new BowlerRecord();
    });
  }
  
}
