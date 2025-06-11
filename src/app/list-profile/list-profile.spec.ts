import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfile } from './list-profile';

describe('ListProfile', () => {
  let component: ListProfile;
  let fixture: ComponentFixture<ListProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
