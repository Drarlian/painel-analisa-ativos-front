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
    path: '**',
    redirectTo: 'multimarcas',
  },
];
