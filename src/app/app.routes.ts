import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    // al poner component hace de que no haya ninguna carga perezosa,
    // no se haga ninguna separación de código y va a ser parte de nuestro buldle principal de la aplicación
    // component:

    // perso si queremos que solo sea cargado bajo demanda
    // hasta que alguien pueda entrar a la página lo mejor es hacer un loadComponent
    // load component recibe una función y esa función es conocida como el lazyload de nuestro componente
    loadComponent: () =>
      import('./gifs/pages/dashboard-page/dashboard-page.component'),
    children: [
      {
        path: 'trending',
        loadComponent: () =>
          import('./gifs/pages/trending-page/trending-page.component'),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./gifs/pages/search-page/search-page.component'),
      },
      {
        path: 'history/:query',
        loadComponent: () =>
          import('./gifs/pages/gif-history/gif-history.component'),
      },
      {
        path: '**',
        redirectTo: 'trending',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
