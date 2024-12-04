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
      <div *ngFor="let case of failureCases" class="case">
        {{ case.ActivityId }} - {{ case.daysrun }} days
      </div>
    </div>
    <div *ngIf="loading" class="loading">Loading...</div>
    <div class="summary">
      Completed: {{ completedCount }}, Locked: {{ lockedCount }}, Total: {{ totalCasesCount }}
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
  failureCases: any[] = [];
  loading: boolean = false;
  completedCount: number = 0;
  lockedCount: number = 0;
  totalCasesCount: number = 0;

  private scrollSubject = new Subject<void>(); // Subject to handle scroll events
  private scrollSubscription!: Subscription;
  private storeSubscriptions: Subscription[] = []; // To manage multiple subscriptions
  currentPage = 1;

  constructor(private store: Store) {}

  ngOnInit() {
    // Initial data load
    this.store.dispatch(loadFailureCases({ page: this.currentPage }));

    // Subscribe to store selectors and update local variables
    this.storeSubscriptions.push(
      this.store.select(selectFailureCases).subscribe(data => (this.failureCases = data)),
      this.store.select(selectLoading).subscribe(isLoading => (this.loading = isLoading)),
      this.store.select(selectCompletedCount).subscribe(count => (this.completedCount = count)),
      this.store.select(selectLockedCount).subscribe(count => (this.lockedCount = count)),
      this.store.select(selectTotalCasesCount).subscribe(count => (this.totalCasesCount = count))
    );

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
    // Cleanup subscriptions
    this.scrollSubscription.unsubscribe();
    this.storeSubscriptions.forEach(sub => sub.unsubscribe());
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
