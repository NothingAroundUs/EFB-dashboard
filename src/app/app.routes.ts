import { Documentation } from './pages/components/documentation/documentation';
import { Routes } from '@angular/router';
import { Home } from './pages/components/home/home';
import { Status } from './pages/components/status/status';
import { Volunteers } from './pages/components/volunteers/volunteers';
import { scansResolver } from './core/resolvers/scans.resolver';
import { statusResolver } from './core/resolvers/status.resolver';
import { usersResolver } from './core/resolvers/user.resolver';
import { Graphs } from './pages/components/graphs/graphs';
import { DownloadPage } from './pages/components/download-page/download-page';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home',
  },
  {
    path: 'status',
    component: Status,
    title: 'API Status',
  },
  {
    path: 'volunteers',
    component: Volunteers,
    title: 'Volunteers Overview',
  },
  {
    path: 'downloads/:version',
    component: DownloadPage,
    title: 'Downloading'
  },
  { path: 'graph', component: Graphs, title: 'Graphs' },
  { path: 'doc', component: Documentation, title: 'Documentation' },
];
