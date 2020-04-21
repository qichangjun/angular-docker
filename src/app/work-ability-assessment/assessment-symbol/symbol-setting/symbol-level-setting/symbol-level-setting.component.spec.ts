import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolLevelSettingComponent } from './symbol-level-setting.component';

describe('SymbolLevelSettingComponent', () => {
  let component: SymbolLevelSettingComponent;
  let fixture: ComponentFixture<SymbolLevelSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolLevelSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolLevelSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
