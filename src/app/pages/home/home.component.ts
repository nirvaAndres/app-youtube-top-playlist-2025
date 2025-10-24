import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { YoutubePlaylistResponse } from '../../core/interfaces/youtube-video';
import { MusicTracksYoutubeService } from '../../services/music-tracks-youtube/music-tracks-youtube.service';
import { TrackCreateItemDialogComponent } from '../../core/shared-components/track-create-item-dialog/track-create-item-dialog.component';
import { TrackUpdateInfoDialogComponent } from '../../core/shared-components/track-update-info-dialog/track-update-info-dialog.component';
import { TrackInfoDialogComponent } from '../../core/shared-components/track-info-dialog/track-info-dialog.component';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'author', 'title', 'actions'];
  dataSource = new MatTableDataSource<YoutubePlaylistResponse>([]);

  fullDataTrackList: YoutubePlaylistResponse[] = [];
  filteredData: YoutubePlaylistResponse[] = [];

  totalItemsTable = 0;
  rowPerPage = 7;
  totalPageSizeOptions: number[] = [];

  constructor(
    private dialog: MatDialog,
    public spinnerService: SpinnerService,
    private playListService: MusicTracksYoutubeService
  ) {}

  ngOnInit(): void {
    this.loadTracks();
  }

  createTrackDialog = (): void => {
    const dialogRef = this.dialog.open(TrackCreateItemDialogComponent , {
      width: '320px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.addTrack(result);
      }
    });
  };

  editTrackDialog = (value:YoutubePlaylistResponse): void => {
    const dialogRef = this.dialog.open(TrackUpdateInfoDialogComponent , {
      width: '320px',
      data: value
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateTrack(result)
    });
  };

  showTrackInfo = (value:YoutubePlaylistResponse):void => {
    const dialogRef = this.dialog.open(TrackInfoDialogComponent , {
      width: '320px',
      data: value
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialog fue cerrado:', result);
    });
  };

  loadTracks = (): void => {
    const playlist = localStorage.getItem('tracksLoaded');
    if (playlist) {
      this.fullDataTrackList = JSON.parse(playlist);
       this.setInfoFilter();
    } else {
      this.playListService.getTracks().subscribe({
        next: (response: YoutubePlaylistResponse[]) => {
          this.fullDataTrackList = response;
          this.saveToLocalStorage();
          this.setInfoFilter();
        }
      });
    }
  };

  setInfoFilter = ():void => {
    this.filteredData = [...this.fullDataTrackList];
    this.totalItemsTable = this.filteredData.length;
    this.updatePageSizeOptions();
    this.updateTablePage(0, this.rowPerPage);
  };

  updateTablePage = (pageIndex: number, pageSize: number): void => {
    this.dataSource.data = this.filteredData.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
  };

  onPageChange = (event: PageEvent): void => {
    this.rowPerPage = event.pageSize;
    this.updateTablePage(event.pageIndex, event.pageSize);
  }

  applyFilter = (event: Event): void => {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredData = filterValue
      ? this.fullDataTrackList.filter(track =>
          track.author.toLowerCase().includes(filterValue) ||
          track.title.toLowerCase().includes(filterValue)
        )
      : [...this.fullDataTrackList];

    this.totalItemsTable = this.filteredData.length;
    this.updatePageSizeOptions();
    if (this.paginator) this.paginator.firstPage();
    this.updateTablePage(0, this.rowPerPage);
  };

  updatePageSizeOptions = (): void => {
    const interval = 7;
    const total = this.totalItemsTable;
    const options: number[] = [];

    for (let i = interval; i < total; i += interval) {
      options.push(i);
    }

    if (!options.includes(total)) {
      options.push(total); 
    }

    this.totalPageSizeOptions = options;
  };

  saveToLocalStorage = (): void => {
    localStorage.setItem('tracksLoaded', JSON.stringify(this.fullDataTrackList));
  };

  addTrack = (newTrack: YoutubePlaylistResponse): void => {
    if (!newTrack.id) {
      newTrack.id = this.fullDataTrackList.length > 0
        ? Math.max(...this.fullDataTrackList.map(t => Number(t.id))) + 1
        : 1;
    }

    this.fullDataTrackList.push(newTrack);
    this.filteredData.push(newTrack);
    this.totalItemsTable = this.filteredData.length;
    this.updatePageSizeOptions();
    this.saveToLocalStorage();
    this.updateTablePage(0, this.rowPerPage);
    if (this.paginator) this.paginator.firstPage();
  };

  updateTrack = (updatedTrack: YoutubePlaylistResponse): void => {
    console.log(updatedTrack);
    const index = this.fullDataTrackList.findIndex(t => t.id === updatedTrack.id);
    if (index !== -1) {
      this.fullDataTrackList[index] = { ...this.fullDataTrackList[index], ...updatedTrack };
      const filteredIndex = this.filteredData.findIndex(t => t.id === updatedTrack.id);
      if (filteredIndex !== -1) {
        this.filteredData[filteredIndex] = { ...this.filteredData[filteredIndex], ...updatedTrack };
      }
      this.saveToLocalStorage();
      this.updateTablePage(this.paginator.pageIndex, this.rowPerPage);
    }
  };

  deleteTrack = (trackId: number): void => {
    this.fullDataTrackList = this.fullDataTrackList.filter(t => t.id !== trackId);
    this.filteredData = this.filteredData.filter(t => t.id !== trackId);
    this.totalItemsTable = this.filteredData.length;
    this.updatePageSizeOptions();
    this.saveToLocalStorage();

    const maxPageIndex = Math.floor((this.totalItemsTable - 1) / this.rowPerPage);
    if (this.paginator.pageIndex > maxPageIndex && this.paginator.pageIndex > 0) {
      this.paginator.previousPage();
    }

    this.updateTablePage(this.paginator.pageIndex, this.rowPerPage);
  };


}
