import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlerPageComponent } from './bowler-page.component';

describe('BowlerPageComponent', () => {
  let component: BowlerPageComponent;
  let fixture: ComponentFixture<BowlerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BowlerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BowlerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
