import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBlockListComponent } from './content-block-list.component';

describe('ContentBlockListComponent', () => {
  let component: ContentBlockListComponent;
  let fixture: ComponentFixture<ContentBlockListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentBlockListComponent]
    });
    fixture = TestBed.createComponent(ContentBlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
