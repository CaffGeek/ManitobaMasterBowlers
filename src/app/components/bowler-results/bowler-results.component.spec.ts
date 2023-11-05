import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlerResultsComponent } from './bowler-results.component';

describe('BowlerResultsComponent', () => {
  let component: BowlerResultsComponent;
  let fixture: ComponentFixture<BowlerResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BowlerResultsComponent]
    });
    fixture = TestBed.createComponent(BowlerResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
