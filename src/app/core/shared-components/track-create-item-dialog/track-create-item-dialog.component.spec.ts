import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCreateItemDialogComponent } from './track-create-item-dialog.component';

xdescribe('TrackCreateItemDialogComponent', () => {
  let component: TrackCreateItemDialogComponent;
  let fixture: ComponentFixture<TrackCreateItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackCreateItemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackCreateItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
