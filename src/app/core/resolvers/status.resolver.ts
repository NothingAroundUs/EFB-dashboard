import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { DataGet } from '../../shared/services/data-get.service';
import { ApiStatus } from '../../shared/interfaces/ApiStatus';
import { catchError, of, take } from 'rxjs';

export const statusResolver: ResolveFn<ApiStatus> = () => {
  return inject(DataGet)
    .getStatusHistory()
    .pipe(catchError(() => of({ statusHistory: [] })));
};
