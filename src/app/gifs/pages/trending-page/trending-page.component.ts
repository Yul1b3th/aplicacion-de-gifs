import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gif.service';

@Component({
  selector: 'app-trending-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  gifService = inject(GifService);
  // gifs = signal(imageUrls);
  // gifs = computed(() => this.gifsService.trendingGifs());

  scrollDivRef = viewChild<ElementRef>('groupDiv');

  onScroll(event: Event) {
    // ponemos ? porque en el momento que el componente se construye todavía no existe el html
    const scrollDiv = this.scrollDivRef()?.nativeElement;
  }
}
