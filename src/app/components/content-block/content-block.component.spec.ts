import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBlockComponent } from './content-block.component';

describe('ContentBlockComponent', () => {
  let component: ContentBlockComponent;
  let fixture: ComponentFixture<ContentBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentBlockComponent]
    });
    fixture = TestBed.createComponent(ContentBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
