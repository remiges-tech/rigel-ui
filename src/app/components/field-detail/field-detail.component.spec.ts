import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldDetailComponent } from './field-detail.component';

describe('FieldDetailComponent', () => {
  let component: FieldDetailComponent;
  let fixture: ComponentFixture<FieldDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldDetailComponent]
    });
    fixture = TestBed.createComponent(FieldDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
