import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-track-create-item-dialog',
  standalone: false,
  templateUrl: './track-create-item-dialog.component.html',
  styleUrl: './track-create-item-dialog.component.scss'
})
export class TrackCreateItemDialogComponent {

  trackForm!: FormGroup;

  constructor( 
    public dialogRef: MatDialogRef<TrackCreateItemDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ){}

  sendInfoDialog = (): void => {
    if (this.trackForm.valid) {
      this.dialogRef.close(this.trackForm.value);
      this.trackForm.reset();
    }
  };

  closeDialog = () => {
    this.dialogRef.close();
  };

  ngOnInit(): void {
    this.trackForm = this.fb.group({
      author: ['', [Validators.required, Validators.maxLength(50)]],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      url: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]]
    });
  }

}
