import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionColumnComponent } from './opinion-column.component';

describe('OpinionColumnComponent', () => {
  let component: OpinionColumnComponent;
  let fixture: ComponentFixture<OpinionColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpinionColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
