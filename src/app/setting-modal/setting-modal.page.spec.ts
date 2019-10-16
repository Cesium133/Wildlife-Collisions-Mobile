import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingModalPage } from './setting-modal.page';

describe('SettingModalPage', () => {
  let component: SettingModalPage;
  let fixture: ComponentFixture<SettingModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
