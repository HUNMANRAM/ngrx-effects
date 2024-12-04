import { createReducer, on } from '@ngrx/store';
import { FailureCasesState, initialState } from './failure-cases.state';
import { 
  loadFailureCases, 
  loadFailureCasesSuccess, 
  loadFailureCasesFailure 
} from './failure-cases.actions';

export const failureCasesReducer = createReducer(
  initialState,
  on(loadFailureCases, (state, { page }) => ({
    ...state,
    loading: true,
    currentPage: page,
  })),
  on(loadFailureCasesSuccess, (state, { failureCases, totalCasesCount, completedCount, lockedCount }) => ({
    ...state,
    loading: false,
    failureCases: [...state.failureCases, ...failureCases], // Append new data
    totalCasesCount,
    completedCount,
    lockedCount,
  })),
  on(loadFailureCasesFailure, (state) => ({
    ...state,
    loading: false,
  }))
);
