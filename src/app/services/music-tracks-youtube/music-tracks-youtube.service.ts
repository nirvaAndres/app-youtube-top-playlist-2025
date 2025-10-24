import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../core/utils/constants';
import { YoutubePlaylistResponse } from '../../core/interfaces/youtube-video';

@Injectable({
  providedIn: 'root'
})

export class MusicTracksYoutubeService {

  constructor(private http:HttpClient){}

  getTracks = (): Observable<YoutubePlaylistResponse[]> => {
    return this.http.get<YoutubePlaylistResponse[]>(`${API_URL}`);
  };

}
