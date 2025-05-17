import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gif.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);
  // gifs = signal(imageUrls);
  // gifs = computed(() => this.gifsService.trendingGifs());

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    // ponemos ? porque en el momento que el componente se construye todavía no existe el html
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clienHeight = scrollDiv.clientHeight; // altura del viewport
    const scrollHeight = scrollDiv.scrollHeight; // altura total del div

    console.log({ scrollTop, clienHeight, scrollHeight });
    console.log({ scrollTotal: scrollTop + clienHeight, scrollHeight });

    const isAtBottom = scrollTop + clienHeight + 300 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    console.log({ isAtBottom });

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
