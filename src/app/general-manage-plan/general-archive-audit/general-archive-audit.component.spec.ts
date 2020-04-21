import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralArchiveAuditComponent } from './general-archive-audit.component';

describe('GeneralArchiveAuditComponent', () => {
  let component: GeneralArchiveAuditComponent;
  let fixture: ComponentFixture<GeneralArchiveAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralArchiveAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralArchiveAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
