import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaturityProcessComponent } from './maturity-process.component';

describe('MaturityProcessComponent', () => {
  let component: MaturityProcessComponent;
  let fixture: ComponentFixture<MaturityProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaturityProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaturityProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
