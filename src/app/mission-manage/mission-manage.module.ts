import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { AgGridModule } from "ag-grid-angular/main";
import { MissionManageComponent } from './mission-manage.component';
import { missionListOperationComponent } from './grid/mission-manage-operation.component';
import { addMissionComponent } from './dialog/addMission/addMission.dialog';
import { MissionPostComponent } from './mission-post/mission-post.component';
import { missionListPostOperationComponent } from './grid/mission-post-operation.component';
import { PermissionGuard } from '../core/guard/permission.guard';
import { missionNameOperationComponent } from './grid/mission-name.component';

const routes:Routes = [  
  { path:'',redirectTo:'startMission',pathMatch:'prefix'},
  { path:'postMission', data:{code:'TWTaskManagent:myTask'},canActivate: [PermissionGuard] ,component:MissionPostComponent},
  { path:'startMission',data:{code:'TWTaskManagent:distributeTask'}, canActivate: [PermissionGuard] ,component:MissionManageComponent}
];
@NgModule({
  declarations: [missionNameOperationComponent,missionListPostOperationComponent,MissionManageComponent,missionListOperationComponent,addMissionComponent, MissionPostComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes),    
    AgGridModule.withComponents([missionListOperationComponent,missionListPostOperationComponent,missionNameOperationComponent])
  ],
  entryComponents:[addMissionComponent]
})
export class MissionManageModule { }
