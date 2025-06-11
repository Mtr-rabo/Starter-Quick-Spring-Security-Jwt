import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsers } from './list-users/list-users';
import { CreateUser } from './listUsers/create-user/create-user';
import { ListProfile } from './list-profile/list-profile';
import { CreateProfile } from './create-profile/create-profile';
import { Login } from './login/login';
import { Admin } from './admin/admin';
import { authenticatGuardGuard } from './guards/authenticat-guard-guard';
import { authorizationGuard } from './guards/authorization-guard';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'admin',
    component: Admin,
    canActivate: [authenticatGuardGuard],
    children: [
      {
        path: 'users',
        component: ListUsers,
        children: [],
      },
      {
        path: 'create',
        component: CreateUser,
        canActivate: [authorizationGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'update-user/:id',
        component: CreateUser,
        canActivate: [authorizationGuard],
        data: { roles: ['ADMIN'] },
      },
      { path: 'profiles', component: ListProfile },
      {
        path: 'create-profile',
        component: CreateProfile,
        canActivate: [authorizationGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'update-profile/:id',
        component: CreateProfile,
        canActivate: [authorizationGuard],
        data: { roles: ['ADMIN'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
