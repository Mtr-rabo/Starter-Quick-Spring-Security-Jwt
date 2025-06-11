import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ListUsers } from './list-users/list-users';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { CreateUser } from './listUsers/create-user/create-user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListProfile } from './list-profile/list-profile';
import { CreateProfile } from './create-profile/create-profile';
import { Login } from './login/login';
import { Admin } from './admin/admin';
import { httpIntercepterInterceptor } from './intercepters/http-intercepter-interceptor';

@NgModule({
  declarations: [
    App,
    ListUsers,
    CreateUser,
    ListProfile,
    CreateProfile,
    Login,
    Admin,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([httpIntercepterInterceptor])),
  ],
  bootstrap: [App],
})
export class AppModule {}
