import { Routes } from '@angular/router';

export const routes: Routes = [
  //*Rutas del GeoVisor
  {
    path: 'geovisor',
    loadComponent: () => import('./geovisor/geovisor.component'),
    children: [
      {
        path: 'mapa',
        title: 'Visor Cartografico',
        loadComponent: () => import('./geovisor/pages/mapa/mapa.component'),
      },
      {
        path:'mapa3D',
        title:'Visor Cartografico 3D',
        loadComponent: () => import('./geovisor/pages/map3d/map3d.component'),
      },
      {
        path: '',
        redirectTo: 'mapa',
        pathMatch: 'full',
      },
    ],
  },
  //*Rutas del Login
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component'),
    children: [
      {
        path: 'login',
        title: 'Ingreso',
        loadComponent: () => import('./auth/pages/login/login.component'),
      },
      {
        path: 'register',
        title: 'Registrar',
        loadComponent: () => import('./auth/pages/register/register.component'),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  //*Ruta de error
  {
    path: 'error404',
    title:'Error de pagina',
    loadComponent: () => import('./shared/error404/error404.component'),
  },
  //*Ruta simples
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
