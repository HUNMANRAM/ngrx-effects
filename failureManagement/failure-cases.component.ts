import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
    <div class="failure-cases-list" (scroll)="onScroll($event)">
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
export class FailureCasesComponent implements OnInit {
  failureCases$ = this.store.select(selectFailureCases);
  loading$ = this.store.select(selectLoading);
  completedCount$ = this.store.select(selectCompletedCount);
  lockedCount$ = this.store.select(selectLockedCount);
  totalCasesCount$ = this.store.select(selectTotalCasesCount);

  currentPage = 1;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadFailureCases({ page: this.currentPage }));
  }

  onScroll(event: any) {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.currentPage++;
      this.store.dispatch(loadFailureCases({ page: this.currentPage }));
    }
  }
}
