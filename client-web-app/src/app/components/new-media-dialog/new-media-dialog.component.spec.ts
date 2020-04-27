import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMediaDialogComponent } from './new-media-dialog.component';

describe('NewMediaDialogComponent', () => {
  let component: NewMediaDialogComponent;
  let fixture: ComponentFixture<NewMediaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMediaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMediaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
