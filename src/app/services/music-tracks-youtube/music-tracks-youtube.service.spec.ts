import { TestBed } from '@angular/core/testing';

import { MusicTracksYoutubeService } from './music-tracks-youtube.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { YoutubePlaylistResponse } from '../../core/interfaces/youtube-video';
import { API_URL } from '../../core/utils/constants';

describe('MusicTracksYoutubeService', () => {
  
 let service: MusicTracksYoutubeService;
 let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MusicTracksYoutubeService,
        provideHttpClient(),              
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(MusicTracksYoutubeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no queden peticiones pendientes
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería realizar una petición GET a la URL correcta y devolver los datos esperados', () => {

    const mockResponse: YoutubePlaylistResponse[] = [
      { id: 1,author:'Andres', title: 'Song 1', url: 'https://youtube.com/watch?v=abc123' },
      { id: 2,author:'Medina', title: 'Song 2', url: 'https://youtube.com/watch?v=def456' }
    ];

    service.getTracks().subscribe((tracks) => {
      expect(tracks.length).toBe(2);
      expect(tracks).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${API_URL}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    
  });

});
