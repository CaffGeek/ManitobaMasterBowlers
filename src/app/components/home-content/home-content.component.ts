import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  content;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.api.whoami().subscribe(x => console.log(x));
  }

}
