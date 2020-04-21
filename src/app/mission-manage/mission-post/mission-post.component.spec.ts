import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionPostComponent } from './mission-post.component';

describe('MissionPostComponent', () => {
  let component: MissionPostComponent;
  let fixture: ComponentFixture<MissionPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
