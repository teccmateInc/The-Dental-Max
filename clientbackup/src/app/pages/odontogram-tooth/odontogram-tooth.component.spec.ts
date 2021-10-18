import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontogramToothComponent } from './odontogram-tooth.component';

describe('OdontogramToothComponent', () => {
  let component: OdontogramToothComponent;
  let fixture: ComponentFixture<OdontogramToothComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdontogramToothComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdontogramToothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
