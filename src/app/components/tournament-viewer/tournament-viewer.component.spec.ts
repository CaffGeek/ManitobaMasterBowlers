import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentViewerComponent } from './tournament-viewer.component';

describe('TournamentViewerComponent', () => {
  let component: TournamentViewerComponent;
  let fixture: ComponentFixture<TournamentViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
