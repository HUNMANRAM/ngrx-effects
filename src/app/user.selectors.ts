import { createSelector, createFeatureSelector } from '@ngrx/store';
//import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<any>('user');

export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.users
);



// Step 3: Create a selector to get a specific user by email
export const selectUserByEmail = (email: string) =>
  createSelector(selectAllUsers, (users) =>
    users.find((user:any) => user.email === email)
  );







// import { createSelector, createFeatureSelector } from '@ngrx/store';
// import { AppState } from './reducer';

// // Step 1: Create a feature selector for the app state
// export const selectAppState = createFeatureSelector<AppState>('app');

// // Step 2: Create a selector to get the users array
// export const selectUsers = createSelector(
//   selectAppState,
//   (state: AppState) => state.users
// );

// // Step 3: Create a selector to get a specific user by email
// export const selectUserByEmail = (email: string) =>
//   createSelector(selectUsers, (users) =>
//     users.find((user) => user.email === email)
//   );
