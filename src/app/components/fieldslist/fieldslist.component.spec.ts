import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldslistComponent } from './fieldslist.component';

describe('FieldslistComponent', () => {
  let component: FieldslistComponent;
  let fixture: ComponentFixture<FieldslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldslistComponent]
    });
    fixture = TestBed.createComponent(FieldslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
