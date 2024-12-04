import { createAction, props } from '@ngrx/store';

export const loadFailureCases = createAction(
  '[Failure Cases] Load Failure Cases',
  props<{ page: number }>() // Load cases for the given page
);

export const loadFailureCasesSuccess = createAction(
  '[Failure Cases] Load Failure Cases Success',
  props<{ 
    failureCases: any[], 
    totalCasesCount: number,
    completedCount: number,
    lockedCount: number
  }>() // API response data
);

export const loadFailureCasesFailure = createAction(
  '[Failure Cases] Load Failure Cases Failure'
);
