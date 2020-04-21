import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingModelComponent } from './working-model.component';

describe('WorkingModelComponent', () => {
  let component: WorkingModelComponent;
  let fixture: ComponentFixture<WorkingModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
