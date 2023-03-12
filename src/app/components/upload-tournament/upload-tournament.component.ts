import { Component, EventEmitter, HostListener, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-tournament',
  templateUrl: './upload-tournament.component.html',
  styleUrls: ['./upload-tournament.component.css']
})
export class UploadTournamentComponent implements OnInit {
  @Output() tournamentUploadedEvent = new EventEmitter<TournamentUploadFormat[]>();

  ngOnInit() {
let testData = `Derek Orne	289	231	405	267	324	293	296	299
Will Thompson	293	344	297	303	299	218	310	293
Alyssa Campbell	240	271	327	247	333	242	380	259
Dylan Stevenson	193	311	319	266	272	298	257	325
Jeston Bart ram	297	251	343 289
Geoff Born	336	257	240	264	256     	252	248	312
Colton Youzwa	234	312	275	258	304	241	228	312
Kyle Costello	230	284	383	251	239	259	278	234
Jennifer Devenney	267	219	283	280	335	266	284	221
Randy Morrissette	224	288	313	219	248	348	229	261
Andrew Lamonica	269	255	241	308	230	273	303	250
Dean Bartel	208	215	314	320	340	224	250	237
Karen Armstrong	261	275	295	216	300	252	265	243
Tyson Nelson	241	320	236	291	227	307	237	220
Dwayne Gelardi	251	235	283	276	258	270	256	217
Brett Hen drick son	278	193	262	305	330	248	233	193
Sam Gelardi	253	233	260	236	251	219	273	303
Kevin Boyko	209	255	381	265	188	241	299	179
Jessica Meurrens	216	230	244	308	203	241	246	322
Ryan Born	222	275	264	333	299	207	226	175
Andrea Alblas	231	215	275	216	322	242	231	251`;

    let results = this.parseUpload(testData) as TournamentUploadFormat[];
    this.tournamentUploadedEvent.emit(results);
  }

  @HostListener('paste', ['$event'])
  onPaste($event: ClipboardEvent) {
    let clipboardData = $event.clipboardData;
    let clipboardText = clipboardData.getData('text');
    let results = this.parseUpload(clipboardText) as TournamentUploadFormat[];
    this.tournamentUploadedEvent.emit(results);
  }

  parseUpload(tsv) {
    let lines = tsv.split(/\r?\n/);
    
    return lines
      .map(line => /(?<Bowler>[a-zA-Z \.]+)\s+(?<Game1>\d{0,3})?\s*(?<Game2>\d{0,3})?\s*(?<Game3>\d{0,3})?\s*(?<Game4>\d{0,3})?\s*(?<Game5>\d{0,3})?\s*(?<Game6>\d{0,3})?\s*(?<Game7>\d{0,3})?\s*(?<Game8>\d{0,3})?/.exec(line))
      .reduce((a, c) => a ? [...a, c.groups] : [c.groups], []);
    };

}

//TODO: CHAD: Move these
export class TournamentUploadFormat {
  Bowler: string;
  Game1: number;
  Game2: number;
  Game3: number;
  Game4: number;
  Game5: number;
  Game6: number;
  Game7: number;
  Game8: number;
}
