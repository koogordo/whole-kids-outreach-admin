import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotodialogComponent } from './photodialog.component';

describe('PhotodialogComponent', () => {
  let component: PhotodialogComponent;
  let fixture: ComponentFixture<PhotodialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotodialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
