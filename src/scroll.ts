import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadPageData } from './store/data.actions';
import { selectAllData, selectLoading, selectTotal } from './store/data.selectors';
import { BindingState } from '@des-aegis/core';

@Component({
  selector: 'app-flex-grid-pagination',
  template: `
    <wj-flex-grid #flexGrid [itemsSource]="data$ | async" (scrollPositionChanged)="onScroll()">
      <wj-flex-grid-column [header]="'ID'" [binding]="'id'"></wj-flex-grid-column>
      <wj-flex-grid-column [header]="'Name'" [binding]="'name'"></wj-flex-grid-column>
      <wj-flex-grid-column [header]="'Email'" [binding]="'email'"></wj-flex-grid-column>
    </wj-flex-grid>
    <div *ngIf="loading$ | async" class="loading">Loading...</div>
  `,
  styles: [
    `
      .loading {
        text-align: center;
        padding: 10px;
      }
      wj-flex-grid {
        height: 400px;
        width: 100%;
        overflow: auto; /* Enable scrolling */
      }
    `,
  ],
})
export class FlexGridPaginationComponent implements OnInit {
  @ViewChild('flexGrid') flexGrid: any;

  data$: Observable<any[]> = this.store.select(selectAllData);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  total$: Observable<number> = this.store.select(selectTotal);

  pageIndex = 0;
  itemsPerPage = 20;

  constructor(private store: Store) {}

  ngOnInit() {
    // Initial data fetch
    this.fetchData();
  }

  fetchData() {
    // Fetch data based on pageIndex and itemsPerPage
    this.store.dispatch(loadPageData({ pageIndex: this.pageIndex, itemsPerPage: this.itemsPerPage }));
  }

  onScroll() {
    const grid = this.flexGrid.hostElement;
    const { scrollTop, scrollHeight, clientHeight } = grid;

    // Trigger API call when user reaches the bottom (with a buffer)
    if (scrollTop + clientHeight >= scrollHeight - 50 && !(this.loading$ | async)) {
      // Prevent multiple API calls while data is loading
      this.pageIndex++;
      this.fetchData();
    }
  }
}
