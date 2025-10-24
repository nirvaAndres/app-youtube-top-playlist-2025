import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-track-update-info-dialog',
  standalone: false,
  templateUrl: './track-update-info-dialog.component.html',
  styleUrl: './track-update-info-dialog.component.scss'
})

export class TrackUpdateInfoDialogComponent {

  trackForm!: FormGroup;

  constructor( 
    public dialogRef: MatDialogRef<TrackUpdateInfoDialogComponent>, 
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
      id:[this.data.id],
      author: [`${this.data.author}`, [Validators.required, Validators.maxLength(50)]],
      title: [`${this.data.title}`, [Validators.required, Validators.maxLength(100)]],
      url: [`${this.data.url}`, [Validators.required, Validators.pattern(/https?:\/\/.+/)]]
    });
  }

}
