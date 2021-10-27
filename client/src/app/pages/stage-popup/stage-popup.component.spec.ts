import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagePopupComponent } from './stage-popup.component';

describe('StagePopupComponent', () => {
  let component: StagePopupComponent;
  let fixture: ComponentFixture<StagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
