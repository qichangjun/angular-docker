import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAbilityAssessmentComponent } from './work-ability-assessment.component';

describe('WorkAbilityAssessmentComponent', () => {
  let component: WorkAbilityAssessmentComponent;
  let fixture: ComponentFixture<WorkAbilityAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAbilityAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAbilityAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
