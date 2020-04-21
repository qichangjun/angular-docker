import { MaturityProcessService } from './../../../general-archive-setting/maturity-process/maturity-process.service';
import { GeneralArchiveSettingRowData } from './../../../general-archive-setting/general-archive-setting.interface';
import { RetentionPeriodSettingService } from './../../../general-archive-setting/retention-period-setting/retention-period-setting.service';
import { OpenLevelService } from './../../../general-archive-setting/open-level/open-level.service';
import { CategorySettingService } from './../../../general-archive-setting/category-setting/category-setting.service';
import { generalArchivePlanService } from './../../general-archive-plan.service';
import { FormErrorMessageService } from '../../../../core/services/formErrorMessage.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
    selector: 'create-storage-schedule-dialog',
    templateUrl: './createStorageSchedule.dialog.html',
    styleUrls: ['./createStorageSchedule.dialog.scss'],
})
export class createStorageScheduleComponent {
    loading: boolean = false;
    myForm: FormGroup;
    recordClassLists: GeneralArchiveSettingRowData[] = []
    presPeriodLists: GeneralArchiveSettingRowData[] = []
    openClassLists: GeneralArchiveSettingRowData[] = []
    MaturityProcessLists : GeneralArchiveSettingRowData[] = []
    constructor(
        private _MaturityProcessService : MaturityProcessService,
        private _RetentionPeriodSettingService: RetentionPeriodSettingService,
        private _OpenLevelService: OpenLevelService,
        private _CategorySettingService: CategorySettingService,
        private _generalArchivePlanService: generalArchivePlanService,
        private fb: FormBuilder,
        public _formErrorMessageService: FormErrorMessageService,
        public dialogRef: MatDialogRef<createStorageScheduleComponent>,
        @Inject(MAT_DIALOG_DATA) public data : {type:'create' | 'edit',info? : any,parentId? : string,parentInfo?:any}
    ) {
        this.getRetentionList()
        this.getrecordClassLists()
        this.getopenClassLists()
        this.getMaturyProcessLists()
        this.createForm()
        
    }

    async getRetentionList() {
        let res = await this._RetentionPeriodSettingService.getList({ pageSize: '99999', currentPage: 1 })
        this.presPeriodLists = res.data
    }
    async getrecordClassLists() {
        let res = await this._CategorySettingService.getList({ pageSize: '99999', currentPage: 1 })
        this.recordClassLists = res.data
    }
    async getopenClassLists() {
        let res = await this._OpenLevelService.getList({ pageSize: '99999', currentPage: 1 })
        this.openClassLists = res.data
    }

    async getMaturyProcessLists(){
        let res = await this._MaturityProcessService.getList({ pageSize: '99999', currentPage: 1 })
        this.MaturityProcessLists = res.data
    }

    createForm() {        
        this.myForm = this.fb.group({
            className: ['', [Validators.required]],
            classCode: ['', [Validators.required]],
            classDesc: ['', []],
            recordClass: ['', []],
            presPeriod: ['', []],
            openClass: ['', []],
            disabled: ['0', []],
            remarks: ['', []],
            dueTimeAct : ['',[]],
            isNeedFill : [false,[]]
        }); 
        for (let key in this.myForm.controls){
            if (this.data.parentInfo[key]){
                this.myForm.controls[key].setValue(this.data.parentInfo[key])
            }
        }       
        this.myForm.value.isNeedFill == '0' ?  this.myForm.controls.isNeedFill.setValue(false) :
        this.myForm.controls.disabled.setValue(true)
        this.myForm.value.disabled == 1 ?  this.myForm.controls.disabled.setValue(true) :
        this.myForm.controls.disabled.setValue(false)
        this.myForm.controls.className.setValue('')
        this.myForm.controls.classCode.setValue('')
        this.myForm.controls['isNeedFill'].valueChanges.subscribe((value)=>{
            if(!value){
                this.myForm.controls.classDesc.setValue('')
                this.myForm.controls.recordClass.setValue('')
                this.myForm.controls.presPeriod.setValue('')
                this.myForm.controls.openClass.setValue('')
                this.myForm.controls.dueTimeAct.setValue('')
            }
        })
    }

    async postDate() {
        try {
            this.loading = true
            if (this.data.type == 'create') {
                let info = Object.assign({},this.myForm.value)
                info.disabled = info.disabled ? 0 : 1
                info.isNeedFill = info.isNeedFill == true ? '1' : '0'
                info.parentId = this.data.parentId
                await this._generalArchivePlanService.addStorageSchedule(info)
            } else {
                let info = Object.assign(this.data.info, this.myForm.value)
                info.disabled = info.disabled ? 0 : 1
                info.parentId = this.data.parentId
                info.isNeedFill = info.isNeedFill == true ? '1' : '0'
                await this._generalArchivePlanService.updateStorageSchedule(info) 
            }
            this.dialogRef.close(true)
            this.loading = false
        } catch (err) {
            this.loading = false
        }
    }

}
