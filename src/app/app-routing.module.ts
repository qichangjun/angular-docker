import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guard/auth.guard';
import { FullComponent } from './full/full.component';
import { UploadFileComponent } from './uploadFIle/uploadFIle.component'
import { PermissionGuard } from './core/guard/permission.guard';
import { CheckTokenGuard } from './core/guard/checkToken.guard';

const routes: Routes = [
  { path:'workspace',component:FullComponent,children:[
    { path: '', redirectTo: 'workAbilityAssessment', pathMatch: 'prefix' },
    { path: 'workAbilityAssessment', data:{code:'TWWorkAbilityAssess'},canActivate: [PermissionGuard] , loadChildren: './work-ability-assessment/work-ability-assessment.module#WorkAbilityAssessmentModule'},     
    { path: 'generalManagePlan', data:{code:'TWIntegratedManagement'}, canActivate: [PermissionGuard] , loadChildren: './general-manage-plan/general-manage-plan.module#GeneralManagePlanModule'},   
    { path: 'sysSetting', data:{code:'TWSysSetting'}, canActivate: [PermissionGuard] , loadChildren: './sys-setting/sys-setting.module#SysSettingModule'},   
    { path: 'missionManage', data:{code:'TWTaskManagent'}, canActivate: [PermissionGuard] , loadChildren: './mission-manage/mission-manage.module#MissionManageModule'},   
  ],canActivate:[AuthGuard,CheckTokenGuard]},
  { path:'uploadFile', component: UploadFileComponent, outlet: 'uploadFile' },
  { path:'404',loadChildren:'./404/notFound.module#NotFoundModule'},  
  { path:'',canActivate:[AuthGuard,CheckTokenGuard,PermissionGuard], data:{code:''},loadChildren:'./main-page/main-page.module#MainPageModule'},  
  { path:'login',loadChildren:'./login/login.module#LoginModule'},  
  { path:'**',redirectTo:'404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
