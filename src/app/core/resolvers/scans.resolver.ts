import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { DataGet } from '../../shared/services/data-get.service';
import { Scan } from '../../shared/interfaces/scan.interface';
import { catchError, of, take } from 'rxjs';

export const scansResolver: ResolveFn<Scan> = () => {
  return inject(DataGet)
    .getData()
    .pipe(catchError(() => of({ scanData: [] })));
};
