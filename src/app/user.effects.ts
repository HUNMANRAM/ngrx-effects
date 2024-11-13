// import { Injectable } from "@angular/core";
// import { Actions,createEffect, ofType } from "@ngrx/effects";
// import { UsersService } from "./users.service";
// import { getUsers, setUsers } from "./user.action";
// import { mergeMap,map } from "rxjs/operators";

// @Injectable()
// class userEffect {

//     constructor(private actions$:Actions,private us:UsersService ){

//     }

//   fetchusers =  createEffect(
//         ()=>   {
//             this.actions$.pipe(
//                 ofType(getUsers),
//                 mergeMap(
//                     () => this.us.getUser().pipe(
//                         map((data)=> setUsers({users:data})  )
//                     )
//                 )
//             )
//         }
//     )


// }
// src/app/store/effects/employee.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
//import { loadEmployees, loadEmployeesSuccess, loadEmployeesFailure } from '../actions/employee.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersService } from './users.service';
 import { getUsers, setError, setUsers } from "./user.action";

 @Injectable({
    providedIn: 'root'
  })
export class userEffects {
  private employeeService = inject(UsersService);
     actions$ = inject(Actions);

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      mergeMap(() =>
        this.employeeService.getUser().pipe(
          map((data) => setUsers({users:data})),
          catchError((error) => of(setError({ error })))
        )
      )
    )
  );

  //constructor(private actions$: Actions, private employeeService: UsersService) {}
}



// import { Injectable, inject } from '@angular/core';
// import { ProductApiService } from '../../shared/services/product-api.service';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import * as ProductActions from './product.action';
// import { catchError, map, of, switchMap } from 'rxjs';
// @Injectable()
// export class ProductEffect {
//   private api = inject(ProductApiService);
//   action$ = inject(Actions);

//   loadProducts$ = createEffect(() =>
//     this.action$.pipe(
//       ofType(ProductActions.loadProduct),
//       switchMap(() =>
//         this.api.getProducts().pipe(
//           map((res) => ProductActions.loadProductSuccess({ products: res })),
//           catchError((error: { message: string }) =>
//             of(
//               ProductActions.loadProductFailure({
//                 errorMessage: 'Fail to load products',
//               })
//             )
//           )
//         )
//       )
//     )
//   );
// }
