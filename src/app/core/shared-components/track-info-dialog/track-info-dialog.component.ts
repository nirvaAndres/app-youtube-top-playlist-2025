import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { YoutubePlaylistResponse } from '../../interfaces/youtube-video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-track-info-dialog',
  standalone: false,
  templateUrl: './track-info-dialog.component.html',
  styleUrl: './track-info-dialog.component.scss'
})

export class TrackInfoDialogComponent {

  safeUrl!: SafeResourceUrl;

  constructor( 
    public dialogRef: MatDialogRef<TrackInfoDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: YoutubePlaylistResponse,
    private sanitizer: DomSanitizer
  ){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
  }

  closeDialog = (): void => {
    this.dialogRef.close('Dialog cerrado');
  };

}
