import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackUpdateInfoDialogComponent } from './track-update-info-dialog.component';

xdescribe('TrackUpdateInfoDialogComponent', () => {
  let component: TrackUpdateInfoDialogComponent;
  let fixture: ComponentFixture<TrackUpdateInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackUpdateInfoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackUpdateInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
