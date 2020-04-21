import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionPeriodSettingComponent } from './retention-period-setting.component';

describe('RetentionPeriodSettingComponent', () => {
  let component: RetentionPeriodSettingComponent;
  let fixture: ComponentFixture<RetentionPeriodSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetentionPeriodSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetentionPeriodSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
