import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollStateService {
  // Lo ideal es crear metodos y propiedades para leer y actualizar esa señal, especialmente si son de los servicios
  trendingScrollState = signal(0);

  // pagesScrollState: Record<string, number> = {
  //   'page1': 1000,
  //   'page2': 0,
  //   'aboutPage': 50,
  //   'page20': 0,
  // }
}
