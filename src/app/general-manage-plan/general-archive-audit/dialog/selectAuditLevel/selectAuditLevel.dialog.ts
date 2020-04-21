
import { FormErrorMessageService } from '../../../../core/services/formErrorMessage.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { generalArchiveAuditService } from '../../general-archive-audit.service';
import { GeneralArchiveSettingRowData } from '../../../general-archive-setting/general-archive-setting.interface';
import { AuditLevelService } from '../../../general-archive-setting/audit-level/audit-level.service';

@Component({
    selector: 'select-audit-level-dialog',
    templateUrl: './selectAuditLevel.dialog.html',
    styleUrls: ['./selectAuditLevel.dialog.scss'],
})
export class selectAuditLevelComponent {
    loading: boolean = false;
    myForm: FormGroup;
    auditLevelList : Array<GeneralArchiveSettingRowData> = []
    constructor(
        private _AuditLevelService : AuditLevelService,
        private _generalArchiveAuditService : generalArchiveAuditService,
        private fb: FormBuilder,
        public _formErrorMessageService: FormErrorMessageService,
        public dialogRef: MatDialogRef<selectAuditLevelComponent>,
        @Inject(MAT_DIALOG_DATA) public data 
    ) {
        this.getAuditLevel()
        this.createForm()        
    }

    async getAuditLevel(){
        let res = await this._AuditLevelService.getList({currentPage:1,pageSize:'999'})
        this.auditLevelList = res.data
        if(this.auditLevelList.length > 0){
            this.myForm.controls.rateIdAudit.setValue(this.auditLevelList[0].id)
        }
    }

    createForm() {
        this.myForm = this.fb.group({
            rateIdAudit: ['', [Validators.required]],
        });
    }

    async postDate() {
        try{
            this.loading = true 
            await this._generalArchiveAuditService.selectAuditLevel(this.data.submitTag,this.myForm.value.rateIdAudit)
            if (this.data.hasOpinion){
                await this._generalArchiveAuditService.postReviewOpinion(this.data.info,this.data.submitTag)
            }            
            await this._generalArchiveAuditService.passAudit(this.data.submitTag)
            this.dialogRef.close(true)
            this.loading = false
        }catch(err){
            this.loading = false
        }        
    }

}
