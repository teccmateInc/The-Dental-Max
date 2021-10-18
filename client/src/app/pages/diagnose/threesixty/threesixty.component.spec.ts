import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreesixtyComponent } from './threesixty.component';

describe('ThreesixtyComponent', () => {
  let component: ThreesixtyComponent;
  let fixture: ComponentFixture<ThreesixtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreesixtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreesixtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
