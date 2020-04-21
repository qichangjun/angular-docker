import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralArchiveSettingComponent } from './general-archive-setting.component';

describe('GeneralArchiveSettingComponent', () => {
  let component: GeneralArchiveSettingComponent;
  let fixture: ComponentFixture<GeneralArchiveSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralArchiveSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralArchiveSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
