import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentUploadPageComponent } from './tournament-upload-page.component';

describe('TournamentUploadPageComponent', () => {
  let component: TournamentUploadPageComponent;
  let fixture: ComponentFixture<TournamentUploadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentUploadPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentUploadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
