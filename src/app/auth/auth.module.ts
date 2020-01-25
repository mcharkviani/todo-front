import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AuthRoutingComponents, AuthRoutingModule} from './auth-routing.module';
import {AuthService} from './auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './auth.guard';

@NgModule({
  declarations: [
    AuthRoutingComponents
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
  ],
  providers: [AuthService, AuthGuard]
})
export class AuthModule { }
