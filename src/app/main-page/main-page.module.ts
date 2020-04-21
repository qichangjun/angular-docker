import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { ShareModule } from '../share/share.module';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [  
  { path:'',component:MainPageComponent}
];

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes),
  ]
})
export class MainPageModule { }
