import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackInfoDialogComponent } from './track-info-dialog.component';

xdescribe('TrackInfoDialogComponent', () => {
  let component: TrackInfoDialogComponent;
  let fixture: ComponentFixture<TrackInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackInfoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
