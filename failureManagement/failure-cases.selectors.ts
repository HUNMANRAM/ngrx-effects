import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FailureCasesState } from './failure-cases.state';

export const selectFailureCasesState = createFeatureSelector<FailureCasesState>('failureCases');

export const selectFailureCases = createSelector(
  selectFailureCasesState,
  (state) => state.failureCases
);

export const selectLoading = createSelector(
  selectFailureCasesState,
  (state) => state.loading
);

export const selectCompletedCount = createSelector(
  selectFailureCasesState,
  (state) => state.completedCount
);

export const selectLockedCount = createSelector(
  selectFailureCasesState,
  (state) => state.lockedCount
);

export const selectTotalCasesCount = createSelector(
  selectFailureCasesState,
  (state) => state.totalCasesCount
);
