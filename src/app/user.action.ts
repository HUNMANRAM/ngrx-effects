import { createAction, props } from "@ngrx/store";

export const setUsers = createAction('set-users', props<{ users: any[] }>());

export const getUsers = createAction('get-users');

export const setError =createAction('set-error',props  <{error:any}>())