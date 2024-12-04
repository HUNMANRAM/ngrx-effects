import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { loadFailureCases } from './store/failure-cases.actions';
import { 
  selectFailureCases, 
  selectLoading, 
  selectCompletedCount, 
  selectLockedCount, 
  selectTotalCasesCount 
} from './store/failure-cases.selectors';

@Component({
  selector: 'app-failure-cases',
  template: `
    <div class="failure-cases-list" (scroll)="onScroll()">
      <div *ngFor="let case of failureCases$ | async" class="case">
        {{ case.ActivityId }} - {{ case.daysrun }} days
      </div>
    </div>
    <div *ngIf="loading$ | async" class="loading">Loading...</div>
    <div class="summary">
      Completed: {{ completedCount$ | async }}, Locked: {{ lockedCount$ | async }}, Total: {{ totalCasesCount$ | async }}
    </div>
  `,
  styles: [`
    .failure-cases-list { height: 400px; overflow-y: auto; }
    .case { padding: 10px; border-bottom: 1px solid #ddd; }
    .loading { text-align: center; padding: 10px; }
    .summary { padding: 10px; font-weight: bold; }
  `],
})
export class FailureCasesComponent implements OnInit, OnDestroy {
  failureCases$ = this.store.select(selectFailureCases);
  loading$ = this.store.select(selectLoading);
  completedCount$ = this.store.select(selectCompletedCount);
  lockedCount$ = this.store.select(selectLockedCount);
  totalCasesCount$ = this.store.select(selectTotalCasesCount);

  private scrollSubject = new Subject<void>(); // Subject to handle scroll events
  private scrollSubscription!: Subscription;
  currentPage = 1;

  constructor(private store: Store) {}

  ngOnInit() {
    // Initial data load
    this.store.dispatch(loadFailureCases({ page: this.currentPage }));

    // Handle debounced scroll events
    this.scrollSubscription = this.scrollSubject
      .pipe(
        debounceTime(200), // Debounce scroll events by 200ms
        filter(() => this.shouldLoadMore()) // Only trigger when scrolled to the bottom
      )
      .subscribe(() => {
        this.currentPage++;
        this.store.dispatch(loadFailureCases({ page: this.currentPage }));
      });
  }

  ngOnDestroy() {
    // Cleanup subscription
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  onScroll() {
    // Emit a scroll event to the subject
    this.scrollSubject.next();
  }

  private shouldLoadMore(): boolean {
    const container = document.querySelector('.failure-cases-list') as HTMLElement;
    return container.scrollHeight - container.scrollTop === container.clientHeight;
  }
}
