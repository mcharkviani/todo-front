import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AuthRoutingComponents, AuthRoutingModule} from './auth-routing.module';
import {AuthService} from './auth.service';

@NgModule({
  declarations: [
    AuthRoutingComponents
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
  providers: [AuthService]
})
export class AuthModule { }
