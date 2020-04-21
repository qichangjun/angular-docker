import { reSelfEvaluationComponent } from './assessment-symbol/symbol-info/dialog/reSelfEvaluation/reSelfEvaluation.dialog';
import { symbolInfoAuditRemarksComponent } from './assessment-symbol/symbol-info/grid/symbol-info-auditRemark.component';
import { symbolInfoOperationComponent } from './assessment-symbol/symbol-info/grid/symbol-info-operation.component';
import { selfEvaluationInfoOperationComponent } from './self-evaluation/grid/self-evaluation-info-operation.component';
import { selfEvaluationInfoRemarksComponent } from './self-evaluation/grid/self-evaluation-info-remark.component';
import { selfEvaluationInfoQuestComponent } from './self-evaluation/grid/self-evaluation-info-quest.component';
import { selfEvaluationInfoUploadComponent } from './self-evaluation/grid/self-evaluation-info-upload.component';
import { symbolInfoUploadComponent } from './assessment-symbol/symbol-info/grid/symbol-info-upload.component';
import { symbolItemOperationComponent } from './assessment-symbol/symbol-setting/symbol-item-setting/grid/symobl-item-operation.grid';
import { createKindComponent } from './assessment-symbol/symbol-setting/symbol-item-setting/dialog/createKind/createKind.dialog';
import { createSymbolItemComponent } from './assessment-symbol/symbol-setting/symbol-item-setting/dialog/createSymbolItem/createSymbolItem.dialog';
import { symbolLevelOperationComponent } from './assessment-symbol/symbol-setting/symbol-level-setting/grid/symobl-level-operation.grid';
import { createSymbolLevelComponent } from './assessment-symbol/symbol-setting/symbol-level-setting/dialog/createSymbolLevel/createSymbolLevel.dialog';
import { WorkAbilityAssessmentComponent } from './work-ability-assessment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { AssessmentSymbolComponent } from './assessment-symbol/assessment-symbol.component';
import { SymbolSettingComponent } from './assessment-symbol/symbol-setting/symbol-setting.component';
import { SymbolItemSettingComponent } from './assessment-symbol/symbol-setting/symbol-item-setting/symbol-item-setting.component';
import { SymbolLevelSettingComponent } from './assessment-symbol/symbol-setting/symbol-level-setting/symbol-level-setting.component';
import { AgGridModule } from "ag-grid-angular/main";
import { SymbolInfoComponent } from './assessment-symbol/symbol-info/symbol-info.component';
import { SelfEvaluationComponent } from './self-evaluation/self-evaluation.component';
import { ScoreOrderComponent } from './score-order/score-order.component';
import { scoreProgressComponent } from './score-order/grid/score-progress.component';
import { selfEvaluationAuditQuestComponent } from './self-evaluation/grid/self-evaluation-audit.component';
import { selfEvaluationBackRemarksComponent } from './self-evaluation/grid/self-evaluation-back-remark.component';
import { PermissionGuard } from '../core/guard/permission.guard';
import { scoreNameComponent } from './score-order/grid/score-name.component';
import { ScoreOrderDetailComponent } from './score-order-detail/score-order-detail.component';
import { scoreOperationComponent } from './score-order/grid/score-operation.component';
import { symbolInfoFinishOperationComponent } from './assessment-symbol/symbol-info/grid/symbol-info-finish-operation.component';

const routes:Routes = [  
  { path:'',component:WorkAbilityAssessmentComponent,children:[
    {path:'',redirectTo:'scoreOrder',pathMatch:'prefix'},
    {path:'selfEvaluation',
      data:{code:'TWWorkAbilityAssess:self'}, 
      canActivate: [PermissionGuard] ,
      component:SelfEvaluationComponent},
    {path:'ScoreOrderDetail',
      canActivate: [PermissionGuard] ,
      data:{code:'TWWorkAbilityAssess:unitStatistics'},      
      component:ScoreOrderDetailComponent} ,
    {path:'scoreOrder',
      data:{code:'TWWorkAbilityAssess:statistics'}, 
      canActivate: [PermissionGuard] ,
      component:ScoreOrderComponent},
    {path:'assessmentSymbol',
      data:{code:'TWWorkAbilityAssess:assess'}, 
      canActivate: [PermissionGuard] ,
      component:AssessmentSymbolComponent,children:[
        {path:'',redirectTo:'SymbolSetting',pathMatch:'prefix'},
        {path:'SymbolSetting',component:SymbolSettingComponent,children:[
          {path:'',redirectTo:'SymbolItemSetting',pathMatch:'prefix'},
          {path:'SymbolItemSetting',component:SymbolItemSettingComponent},
          {path:'SymbolLevelSetting',component:SymbolLevelSettingComponent}
        ]},
        {path:'SymbolInfo',component:SymbolInfoComponent}
      ]
    },
    {path:'ScoreOrderDetailUnits',
      data:{code:'TWWorkAbilityAssess:statistics'},   
      canActivate: [PermissionGuard] ,   
      component:ScoreOrderDetailComponent}        
    ]}
];
@NgModule({
  declarations: [
    scoreNameComponent,selfEvaluationBackRemarksComponent,
    selfEvaluationAuditQuestComponent,scoreProgressComponent,
    reSelfEvaluationComponent,symbolInfoAuditRemarksComponent,
    symbolInfoOperationComponent,selfEvaluationInfoOperationComponent,
    selfEvaluationInfoRemarksComponent,selfEvaluationInfoQuestComponent,
    selfEvaluationInfoUploadComponent,symbolInfoUploadComponent,
    symbolItemOperationComponent,createKindComponent,createSymbolItemComponent,
    createSymbolLevelComponent,symbolLevelOperationComponent,
    WorkAbilityAssessmentComponent, AssessmentSymbolComponent,
     SymbolSettingComponent, SymbolItemSettingComponent,
      SymbolLevelSettingComponent, SymbolInfoComponent,
       SelfEvaluationComponent, ScoreOrderComponent,symbolInfoFinishOperationComponent, 
       ScoreOrderDetailComponent,scoreOperationComponent],
  entryComponents:[createSymbolLevelComponent,reSelfEvaluationComponent,createSymbolItemComponent,createKindComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes),
    AgGridModule.withComponents([scoreNameComponent,
      selfEvaluationAuditQuestComponent,selfEvaluationBackRemarksComponent,
      scoreProgressComponent,symbolInfoAuditRemarksComponent,symbolInfoOperationComponent,
      selfEvaluationInfoRemarksComponent,selfEvaluationInfoOperationComponent,symbolInfoFinishOperationComponent,
      symbolLevelOperationComponent,selfEvaluationInfoQuestComponent,scoreOperationComponent,
      symbolItemOperationComponent,selfEvaluationInfoUploadComponent,symbolInfoUploadComponent])
  ]
})
export class WorkAbilityAssessmentModule { }
