import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageOpinionComponent } from './storage-opinion.component';

describe('StorageOpinionComponent', () => {
  let component: StorageOpinionComponent;
  let fixture: ComponentFixture<StorageOpinionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageOpinionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
