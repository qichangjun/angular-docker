import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLevelComponent } from './audit-level.component';

describe('AuditLevelComponent', () => {
  let component: AuditLevelComponent;
  let fixture: ComponentFixture<AuditLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
