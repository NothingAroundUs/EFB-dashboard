import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { DataGet } from '../../shared/services/data-get.service';
import { UserList } from '../../shared/interfaces/user.interface';
import { catchError, of } from 'rxjs';

export const usersResolver: ResolveFn<UserList> = () => {
  return inject(DataGet)
    .getUsers()
    .pipe(
      catchError(
        () => of({ users: [] }),
      ),
    );
};
