import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotFoundRoutingModule } from './notFound-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutingModule
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
