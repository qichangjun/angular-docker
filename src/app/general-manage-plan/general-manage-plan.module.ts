import { postReviewOpinionComponent } from './general-archive-audit/dialog/postReviewOpinion/postReviewOpinion.dialog';
import { checkUnitAuditDetailComponent } from './general-archive-audit/dialog/checkUnitAuditDetail/checkUnitAuditDetail.dialog';
import { opinionColumnOperationComponent } from './general-archive-setting/opinion-column/grid/opinion-column-operation.grid';
import { createOpinionColumnComponent } from './general-archive-setting/opinion-column/dialog/createOpinionColumn/createOpinionColumn.dialog';
import { storageOpinionOperationComponent } from './general-archive-setting/storage-opinion/grid/storageOpinion-operation.grid';
import { createStorageOpinionComponent } from './general-archive-setting/storage-opinion/dialog/createStorageOpinion/createStorageOpinion.dialog';
import { createStorageScheduleComponent } from './general-archive-plan/dialog/createStorageSchedule/createStorageSchedule.dialog';
import { maturityProcessOperationComponent } from './general-archive-setting/maturity-process/grid/maturity-process.grid';
import { createMaturityProcessComponent } from './general-archive-setting/maturity-process/dialog/createMaturityProcess/createMaturityProcess.dialog';
import { openLevelOperationComponent } from './general-archive-setting/open-level/grid/openLevel-operation.grid';
import { createOpenLevelComponent } from './general-archive-setting/open-level/dialog/createOpenLevel/createOpenLevel.dialog';
import { categoryOperationComponent } from './general-archive-setting/category-setting/grid/categorySetting-operation.grid';
import { createCategorySettingComponent } from './general-archive-setting/category-setting/dialog/createCategorySetting/createCategorySetting.dialog';
import { retentionPeriodOperationComponent } from './general-archive-setting/retention-period-setting/grid/retentionPeriodSetting-operation.grid';
import { createRetentionPeriodComponent } from './general-archive-setting/retention-period-setting/dialog/createRetentionPeriod/createRetentionPeriod.dialog';
import { GeneralManagePlanComponent } from './general-manage-plan.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { AgGridModule } from "ag-grid-angular/main";
import { GeneralArchiveSettingComponent } from './general-archive-setting/general-archive-setting.component';
import { GeneralArchivePlanComponent } from './general-archive-plan/general-archive-plan.component';
import { RetentionPeriodSettingComponent } from './general-archive-setting/retention-period-setting/retention-period-setting.component';
import { CategorySettingComponent } from './general-archive-setting/category-setting/category-setting.component';
import { OpenLevelSettingComponent } from './general-archive-setting/open-level/open-level.component';
import { MaturityProcessComponent } from './general-archive-setting/maturity-process/maturity-process.component';
import { StorageOpinionComponent } from './general-archive-setting/storage-opinion/storage-opinion.component';
import { OpinionColumnComponent } from './general-archive-setting/opinion-column/opinion-column.component';
import { GeneralArchiveAuditComponent } from './general-archive-audit/general-archive-audit.component';
import { AuditLevelComponent } from './general-archive-setting/audit-level/audit-level.component';
import { auditLevelOperationComponent } from './general-archive-setting/audit-level/grid/auditLevel-operation.grid';
import { createAuditLevelComponent } from './general-archive-setting/audit-level/dialog/createAuditLevel/createAuditLevel.dialog';
import { selectAuditLevelComponent } from './general-archive-audit/dialog/selectAuditLevel/selectAuditLevel.dialog';
import { GeneralArchiveOrderComponent } from './general-archive-order/general-archive-order.component';
import { generalOrderProgressComponent } from './general-archive-order/grid/general-order-progress.component';
import { PermissionGuard } from '../core/guard/permission.guard';
import { generalOrderNameComponent } from './general-archive-order/grid/general-order-name.component';

const routes:Routes = [  
  { path:'',component:GeneralManagePlanComponent,children:[
    {path:'',redirectTo:'generalArchiveOrder',pathMatch:'prefix'},
    {path:'generalArchiveSetting',data:{code:'TWIntegratedManagement:setting'}, canActivate: [PermissionGuard] ,component:GeneralArchiveSettingComponent,children:[
      {path:'',redirectTo:'retentionPeriod',pathMatch:'prefix'},
      {path:'retentionPeriod',component:RetentionPeriodSettingComponent},
      {path:'categorySetting',component:CategorySettingComponent},
      {path:'openLevel',component:OpenLevelSettingComponent},
      {path:'maturityProcess',component:MaturityProcessComponent},
      {path:'storageOpinion',component:StorageOpinionComponent},
      {path:'opinionColumn',component:OpinionColumnComponent},
      {path:'auditLevel',component:AuditLevelComponent}
    ]},
    {path:'generalArchiveOrder',data:{code:'TWIntegratedManagement:statistics'}, canActivate: [PermissionGuard] ,component:GeneralArchiveOrderComponent},
    {path:'generalArchivePlan',data:{code:'TWIntegratedManagement:send'}, canActivate: [PermissionGuard] ,component:GeneralArchivePlanComponent,children:[
     
    ]},
    {path:'generalArchiveAudit',data:{code:'TWIntegratedManagement:audit'}, canActivate: [PermissionGuard] ,component:GeneralArchiveAuditComponent,children:[
     
    ]},
  ]}
];
@NgModule({
  declarations: [generalOrderNameComponent,generalOrderProgressComponent,selectAuditLevelComponent,createAuditLevelComponent,auditLevelOperationComponent,postReviewOpinionComponent,checkUnitAuditDetailComponent,opinionColumnOperationComponent,createOpinionColumnComponent,createStorageOpinionComponent,storageOpinionOperationComponent,createStorageScheduleComponent,maturityProcessOperationComponent,openLevelOperationComponent,createMaturityProcessComponent,createOpenLevelComponent,createCategorySettingComponent,categoryOperationComponent,retentionPeriodOperationComponent,createRetentionPeriodComponent,GeneralArchiveSettingComponent, GeneralArchivePlanComponent, RetentionPeriodSettingComponent,GeneralManagePlanComponent, CategorySettingComponent, OpenLevelSettingComponent, MaturityProcessComponent, StorageOpinionComponent, OpinionColumnComponent, GeneralArchiveAuditComponent, AuditLevelComponent, GeneralArchiveOrderComponent ],
  entryComponents:[createMaturityProcessComponent,selectAuditLevelComponent,createAuditLevelComponent,postReviewOpinionComponent,checkUnitAuditDetailComponent,createOpinionColumnComponent,createStorageOpinionComponent,createStorageScheduleComponent,createRetentionPeriodComponent,createCategorySettingComponent,createOpenLevelComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes),
    AgGridModule.withComponents([generalOrderNameComponent,generalOrderProgressComponent,auditLevelOperationComponent,storageOpinionOperationComponent,opinionColumnOperationComponent,retentionPeriodOperationComponent,categoryOperationComponent,openLevelOperationComponent,maturityProcessOperationComponent])
  ]
})
export class GeneralManagePlanModule { }
