import { Component, ElementRef, OnDestroy, AfterViewInit, signal, viewChild } from '@angular/core';

/**
 * Wrap chips (or anything) in <app-scroll-row> and on mobile they sit in one row
 * that scrolls sideways. A fade and arrow appear on whichever side has hidden items.
 * On laptop the items simply wrap onto several lines.
 */
@Component({
  selector: 'app-scroll-row',
  templateUrl: './scroll-row.html',
  styleUrl: './scroll-row.css',
})
export class ScrollRow implements AfterViewInit, OnDestroy {
  private readonly scroller = viewChild.required<ElementRef<HTMLDivElement>>('scroller');
  private readonly track = viewChild.required<ElementRef<HTMLDivElement>>('track');
  private observer?: ResizeObserver;

  canScrollLeft = signal(false);
  canScrollRight = signal(false);

  ngAfterViewInit() {
    // Re-check whenever the row or its content changes size
    // (for example when a chip's label changes from "Any" to "Under 200")
    this.observer = new ResizeObserver(() => this.update());
    this.observer.observe(this.scroller().nativeElement);
    this.observer.observe(this.track().nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  update() {
    const el = this.scroller().nativeElement;
    const maxScroll = el.scrollWidth - el.clientWidth;

    this.canScrollLeft.set(el.scrollLeft > 4);
    this.canScrollRight.set(el.scrollLeft < maxScroll - 4);
  }

  scrollBy(direction: 1 | -1) {
    const el = this.scroller().nativeElement;
    el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: 'smooth' });
  }
}