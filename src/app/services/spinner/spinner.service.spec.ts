import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería inicializar con isLoading = false', () => {
    expect(service.isLoading()).toBeFalse();
  });

  it('debería establecer isLoading = true al llamar show()', () => {
    service.show();
    expect(service.isLoading()).toBeTrue();
  });

  it('debería establecer isLoading = false al llamar hide()', () => {
    service.show();
    service.hide();
    expect(service.isLoading()).toBeFalse();
  });
});