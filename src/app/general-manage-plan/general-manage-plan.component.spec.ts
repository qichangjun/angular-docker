import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralManagePlanComponent } from './general-manage-plan.component';

describe('GeneralManagePlanComponent', () => {
  let component: GeneralManagePlanComponent;
  let fixture: ComponentFixture<GeneralManagePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralManagePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralManagePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
