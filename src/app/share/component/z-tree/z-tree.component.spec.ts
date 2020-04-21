import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZTreeComponent } from './z-tree.component';

describe('ZTreeComponent', () => {
  let component: ZTreeComponent;
  let fixture: ComponentFixture<ZTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
