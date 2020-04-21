import { cooperationGroupComponent } from './component/cooperationGroupList/cooperationGroupList.component';
import { questItemComponent } from './component/questItem/questItem.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
//angular material 模块
import { MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import {MatStepperModule} from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
//ant design模块
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
//自定义模块
import { MenuItems } from './class/menu-items/menu-items';
import { BreadCrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { FormUploadComponent } from './component/formUpload/formUpload.component';
import { LoadingMessageComponent } from './component/loadingMessage/loadingMessage.component';
import { MyPaginationComponent } from './component/pagination/pagination.component';
import { RecordInfoComponent } from './component/record-info/record-info.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { ZTreeComponent } from './component/z-tree/z-tree.component';
import { ImagePreview } from './directive/image-preview.directive';
import { InitTableValueDirective } from './directive/initTableValue.directive';
import { fileNameToIconfilter } from './pipe/fileNameToIcon.pipe';
import { Sizefilter } from './pipe/size.pipe';
import { chooseCooperationGroupListComponent } from './component/chooseCooperationGroupList/chooseCooperationGroupList.component';
import { missionEditSideBarComponent } from './component/missionEditSideBar/missionEditSideBar.component';
import { missionOfUnitStatusInfoComponent } from './component/missionOfUnitStatusInfo/missionOfUnitStatusInfo.component';
import { checkUnitPostInfoComponent } from './component/missionOfUnitStatusInfo/dialog/checkUnitPostInfo/checkUnitPostInfo.dialog';
import { missionStreamUpdateComponent } from './component/missionStreamUpdate/missionStreamUpdate.component';
import { checkMissionAuditInfoComponent } from './component/missionEditSideBar/dialog/checkMissionAuditInfo/checkMissionAuditInfo.component';
import { ButtonPermissionControllerDirective } from './directive/buttonPermissionController.directive';
import { AppHeaderComponent } from '../full/header/header.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'input',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export class AppDateAdapter extends NativeDateAdapter {
  format(date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    }
    return date.toDateString();
  }
  parse(value) {
    return null
  }
}

@NgModule({
  imports: [
    CommonModule,    
    JsonpModule, MatGridListModule,
    FormsModule, ReactiveFormsModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,MatIconModule,
    FileUploadModule,PerfectScrollbarModule,
    MatTabsModule,MatSlideToggleModule,
    MatButtonToggleModule,NzProgressModule,
    MatCardModule,NzProgressModule,NzPopconfirmModule,
    NzNotificationModule,NzTreeSelectModule,NzToolTipModule,
    MatDatepickerModule, MatRadioModule,NzMessageModule,
    MatNativeDateModule, MatExpansionModule,MatProgressBarModule,
    NzDatePickerModule,MatStepperModule,NzCollapseModule
  ],
  exports: [
    CommonModule,NzNotificationModule,NzTreeSelectModule,MatProgressBarModule,
    questItemComponent,cooperationGroupComponent,PerfectScrollbarModule,
    JsonpModule, ImagePreview, RecordInfoComponent,checkMissionAuditInfoComponent,
    FormsModule, ReactiveFormsModule, MatRadioModule,NzMessageModule,
    RouterModule,chooseCooperationGroupListComponent,ButtonPermissionControllerDirective,
    MatStepperModule,NzCollapseModule,NzDatePickerModule,
    LoadingMessageComponent,missionStreamUpdateComponent,NzToolTipModule,
    SpinnerComponent, ZTreeComponent,NzPopconfirmModule,NzProgressModule,
    Sizefilter, FormUploadComponent, fileNameToIconfilter, InitTableValueDirective, 
    MatProgressSpinnerModule, BreadCrumbComponent, missionOfUnitStatusInfoComponent,
    MatDialogModule,  MyPaginationComponent,missionEditSideBarComponent,
    MatCheckboxModule, AppHeaderComponent,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,NzProgressModule,
    FileUploadModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTreeModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatListModule,
    MatIconModule
  ],
  providers: [
    MenuItems,
    // { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'zh-CN' }
    // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  entryComponents: [checkMissionAuditInfoComponent,checkUnitPostInfoComponent],
  declarations: [AppHeaderComponent,ButtonPermissionControllerDirective,missionStreamUpdateComponent,checkMissionAuditInfoComponent,checkUnitPostInfoComponent,missionOfUnitStatusInfoComponent,missionEditSideBarComponent,chooseCooperationGroupListComponent,cooperationGroupComponent,questItemComponent,RecordInfoComponent,InitTableValueDirective, ImagePreview, LoadingMessageComponent, Sizefilter, fileNameToIconfilter, FormUploadComponent, SpinnerComponent, ZTreeComponent, BreadCrumbComponent, MyPaginationComponent]
})
export class ShareModule { }
