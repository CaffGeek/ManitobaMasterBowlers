import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBlocksPageComponent } from './content-blocks-page.component';

describe('ContentBlocksPageComponent', () => {
  let component: ContentBlocksPageComponent;
  let fixture: ComponentFixture<ContentBlocksPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentBlocksPageComponent]
    });
    fixture = TestBed.createComponent(ContentBlocksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
