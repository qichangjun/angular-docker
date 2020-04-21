import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { SysSettingComponent } from './sys-setting.component';
import { AgGridModule } from "ag-grid-angular/main";
import { WorkingModelComponent } from './working-model/working-model.component';
import { workingModelOperationComponent } from './working-model/grid/working-model-operation.component';
import { editWorkingModelScoreComponent } from './working-model/dialog/editWorkingModelScore/editWorkingModelScore.dialog';
import { PermissionGuard } from '../core/guard/permission.guard';

const routes:Routes = [  
  { path:'',component:SysSettingComponent,children:[    
    {path:'',redirectTo:'workingModel',pathMatch:'prefix'},
    {path:'workingModel', canActivate: [] ,component:WorkingModelComponent}    
  ]}
];
@NgModule({
  declarations: [SysSettingComponent, WorkingModelComponent,workingModelOperationComponent,editWorkingModelScoreComponent],
  entryComponents:[editWorkingModelScoreComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes),
    AgGridModule.withComponents([workingModelOperationComponent])
  ]
})
export class SysSettingModule { }
