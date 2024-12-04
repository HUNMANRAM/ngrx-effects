import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { FailureCasesService } from '../services/failure-cases.service';
import { 
  loadFailureCases, 
  loadFailureCasesSuccess, 
  loadFailureCasesFailure 
} from './failure-cases.actions';

@Injectable()
export class FailureCasesEffects {
  constructor(private actions$: Actions, private failureCasesService: FailureCasesService) {}

  loadFailureCases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFailureCases),
      mergeMap(({ page }) =>
        this.failureCasesService.getFailureCases(page).pipe(
          map((response: any) =>
            loadFailureCasesSuccess({
              failureCases: response.FailureCases,
              totalCasesCount: response.TotalCasesCount,
              completedCount: response.CompletedCount,
              lockedCount: response.LockedCount,
            })
          ),
          catchError(() => of(loadFailureCasesFailure()))
        )
      )
    )
  );
}
