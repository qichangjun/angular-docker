import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolItemSettingComponent } from './symbol-item-setting.component';

describe('SymbolItemSettingComponent', () => {
  let component: SymbolItemSettingComponent;
  let fixture: ComponentFixture<SymbolItemSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolItemSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolItemSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
