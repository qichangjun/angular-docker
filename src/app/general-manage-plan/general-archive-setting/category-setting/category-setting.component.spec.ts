import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySettingComponent } from './category-setting.component';

describe('CategorySettingComponent', () => {
  let component: CategorySettingComponent;
  let fixture: ComponentFixture<CategorySettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
