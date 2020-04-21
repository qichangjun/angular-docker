import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralArchiveOrderComponent } from './general-archive-order.component';

describe('GeneralArchiveOrderComponent', () => {
  let component: GeneralArchiveOrderComponent;
  let fixture: ComponentFixture<GeneralArchiveOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralArchiveOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralArchiveOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
