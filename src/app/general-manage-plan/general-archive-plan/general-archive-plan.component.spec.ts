import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralArchivePlanComponent } from './general-archive-plan.component';

describe('GeneralArchivePlanComponent', () => {
  let component: GeneralArchivePlanComponent;
  let fixture: ComponentFixture<GeneralArchivePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralArchivePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralArchivePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
