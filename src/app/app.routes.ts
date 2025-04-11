import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('../app/modules/global/components/basic-layout/basic-layout.component').then((m) => m.BasicLayoutComponent)
  },
  {
    path: 'analitic/:tipo/:nome',
    loadComponent: () => import('../app/modules/global/components/analitic-layout/analitic-layout.component').then((m) => m.AnaliticLayoutComponent)
  },
  {
    path: 'all/:tipo',
    loadComponent: () => import('../app/modules/global/components/all-actives-layout/all-actives-layout.component').then((m) => m.AllActivesLayoutComponent)
  },
  {
    path: 'about-us',
    loadComponent: () => import('../app/modules/global/components/about-us-layout/about-us-layout.component').then((m) => m.AboutUsLayoutComponent)
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
