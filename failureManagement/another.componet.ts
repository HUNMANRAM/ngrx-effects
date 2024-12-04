import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, throttleTime, filter } from 'rxjs/operators';
import { ItemFacade } from './item.facade';
import { ItemStateService } from './item.state';

@Component({
  selector: 'app-items',
  template: `
    <div #scrollContainer class="item-list" (scroll)="onScroll()">
      <div *ngFor="let item of items" class="item">
        {{ item.name }}
      </div>
    </div>
    <div *ngIf="loading" class="loading">Loading...</div>
  `,
  styles: [`
    .item-list {
      height: 400px;
      overflow-y: auto;
      border: 1px solid #ccc;
    }
    .item {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    .loading {
      text-align: center;
      padding: 10px;
    }
  `],
})
export class ItemsComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  items: any[] = []; // Array to store items
  loading = false; // Loading state

  private scrollSubject = new Subject<void>(); // Subject to emit scroll events
  private scrollSubscription!: Subscription;
  private stateSubscription!: Subscription;

  constructor(
    private itemFacade: ItemFacade,
    private itemState: ItemStateService
  ) {}

  ngOnInit() {
    // Initial data load
    this.loadItems();

    // Subscribe to state changes manually
    this.stateSubscription = this.itemState.state$.subscribe(state => {
      this.items = state.items;
      this.loading = state.loading;
    });

    // Handle scroll events with debouncing and throttling
    this.scrollSubscription = this.scrollSubject
      .pipe(
        debounceTime(200), // Wait 200ms after the last scroll event
        throttleTime(500), // Allow one event every 500ms
        filter(() => this.isAtBottom()) // Proceed only if scrolled to the bottom
      )
      .subscribe(() => this.loadItems());
  }

  ngOnDestroy() {
    // Clean up subscriptions
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }

  onScroll() {
    // Emit scroll event to the Subject
    this.scrollSubject.next();
  }

  private loadItems() {
    this.itemFacade.loadItems();
  }

  private isAtBottom(): boolean {
    const container = this.scrollContainer.nativeElement;
    return container.scrollHeight - container.scrollTop === container.clientHeight;
  }
}
