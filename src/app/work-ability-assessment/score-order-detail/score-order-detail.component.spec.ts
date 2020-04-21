import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreOrderDetailComponent } from './score-order-detail.component';

describe('ScoreOrderDetailComponent', () => {
  let component: ScoreOrderDetailComponent;
  let fixture: ComponentFixture<ScoreOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
