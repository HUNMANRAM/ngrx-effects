import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter,withComponentInputBinding } from '@angular/router';

//import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { userEffects } from './user.effects';
import { userReducer } from './user.reducer'; 
import { AddTodoComponent } from './add-todo/add-todo.component';
import { ShowTodosComponent } from './show-todos/show-todos.component';

const routes = [
  { path: 'add-todo', component: AddTodoComponent },
  { path: 'show-todos', component: ShowTodosComponent },
  { path: '', redirectTo: '/show-todos', pathMatch: 'full' } // Default route
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,withComponentInputBinding()),
    provideHttpClient(), provideStore({user:userReducer}), provideEffects([userEffects])]
};



// import { ApplicationConfig } from '@angular/core';
// import { provideRouter, withComponentInputBinding } from '@angular/router';
// import { AddTodoComponent } from './add-todo/add-todo.component';
// import { ShowTodosComponent } from './show-todos/show-todos.component';
// import { provideLocationStrategy, PathLocationStrategy } from '@angular/common';

// const routes = [
//   { path: 'add-todo', component: AddTodoComponent },
//   { path: 'show-todos', component: ShowTodosComponent },
//   { path: '', redirectTo: '/show-todos', pathMatch: 'full' } // Default route
// ];

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes, withComponentInputBinding()),
//     provideLocationStrategy(PathLocationStrategy)
//   ]
// };
