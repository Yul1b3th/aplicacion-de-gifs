import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { environment } from '@environments/environment.development';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private http = inject(HttpClient);

  //espacio para almacenar los gifs
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);
  searchHistory = signal<Record<string, Gif[]>>({});

  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
    console.log(`searchHistory` + this.searchHistory());
    console.log(`searchHistoryKeys` + this.searchHistoryKeys());
  }

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
        console.log({ gifs });
      });
  }

  searchGifs(query: string) {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          q: query,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

        // Historial
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        }),
      );

    // .subscribe((resp) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
    //   console.log({ search: gifs });
    // });
  }
}
