import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreOrderComponent } from './score-order.component';

describe('ScoreOrderComponent', () => {
  let component: ScoreOrderComponent;
  let fixture: ComponentFixture<ScoreOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
