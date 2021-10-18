import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoTemplatesComponent } from './photo-templates.component';

describe('PhotoTemplatesComponent', () => {
  let component: PhotoTemplatesComponent;
  let fixture: ComponentFixture<PhotoTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
