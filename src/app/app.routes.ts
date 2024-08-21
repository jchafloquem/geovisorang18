import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'geovisor',
    loadComponent: () => import('./geovisor/geovisor.component'),
    children: [
      {
        path: 'mapa',
        title: 'Mapa',
        loadComponent: () => import('./geovisor/pages/mapa/mapa.component'),
      },
      {
        path: '',
        redirectTo: 'mapa',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component'),
    children: [
      {
        path: 'login',
        title: 'login',
        loadComponent: () => import('./auth/pages/login/login.component'),
      },
      {
        path: 'register',
        title: 'register',
        loadComponent: () => import('./auth/pages/register/register.component'),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'error404',
    loadComponent: () => import('./shared/error404/error404.component'),
  },
  {
    path: '',
    redirectTo: '/geovisor',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error404',
    pathMatch: 'full',
  },
];
