import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTournamentComponent } from './upload-tournament.component';

describe('UploadTournamentComponent', () => {
  let component: UploadTournamentComponent;
  let fixture: ComponentFixture<UploadTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadTournamentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
