import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Summary',
    loadComponent: () =>
      import('./pages/components/home/home').then((m) => m.Home),
  },
  {
    path: 'doc',
    title: 'Documentation',
    loadComponent: () =>
      import('./pages/components/documentation/documentation').then(
        (m) => m.Documentation
      ),
  },
  {
    path: 'status',
    title: 'API Status',
    loadComponent: () =>
      import('./pages/components/status/status').then((m) => m.Status),
  },
  {
    path: 'volunteers',
    title: 'Volunteers',
    loadComponent: () =>
      import('./pages/components/volunteers/volunteers').then(
        (m) => m.Volunteers
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
