import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HPSectionComponent } from './h-p-section.component';

describe('HPSectionComponent', () => {
  let component: HPSectionComponent;
  let fixture: ComponentFixture<HPSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HPSectionComponent]
    });
    fixture = TestBed.createComponent(HPSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
