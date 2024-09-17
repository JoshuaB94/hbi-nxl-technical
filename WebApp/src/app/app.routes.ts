import { Routes } from '@angular/router';
import { UserList } from './components/user-list/user-list.component';
import { UserForm } from './components/user-form/user-form.component';
import { UserDetail } from './components/user-detail/user-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserList },
  { path: 'users/new', component: UserForm },
  { path: 'users/:id', component: UserDetail },
  { path: 'users/:id/edit', component: UserForm },
];
