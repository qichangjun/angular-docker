import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';

import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';

const routes:Routes = [  
  { path:'',component:LoginComponent}
];
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes),
  ]
})
export class LoginModule { }
