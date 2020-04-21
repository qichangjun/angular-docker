import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolSettingComponent } from './symbol-setting.component';

describe('SymbolSettingComponent', () => {
  let component: SymbolSettingComponent;
  let fixture: ComponentFixture<SymbolSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
