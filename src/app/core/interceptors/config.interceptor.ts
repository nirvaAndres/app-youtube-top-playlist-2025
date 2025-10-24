import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, of } from 'rxjs';
import { SpinnerService } from '../../services/spinner/spinner.service';


export const configInterceptor: HttpInterceptorFn = (req, next) => {

  const spinner = inject(SpinnerService);

  spinner.show();

  return next(req).pipe(
    finalize(() => spinner.hide())
  );
};
