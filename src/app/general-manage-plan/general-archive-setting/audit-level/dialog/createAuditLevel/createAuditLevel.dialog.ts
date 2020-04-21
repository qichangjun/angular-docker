import { GeneralArchiveSettingRowData } from './../../../general-archive-setting.interface';
import { FormErrorMessageService } from '../../../../../core/services/formErrorMessage.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuditLevelService } from '../../audit-level.service';
@Component({
    selector: 'create-audit-level-dialog',
    templateUrl: './createAuditLevel.dialog.html',
    styleUrls: ['./createAuditLevel.dialog.scss'],
})
export class createAuditLevelComponent {
    loading: boolean = false;
    myForm: FormGroup;
    constructor(
        private _AuditLevelService : AuditLevelService,
        private fb: FormBuilder,
        public _formErrorMessageService: FormErrorMessageService,
        public dialogRef: MatDialogRef<createAuditLevelComponent>,
        @Inject(MAT_DIALOG_DATA) public data : {type:'create' | 'edit',info : GeneralArchiveSettingRowData}
    ) {
        this.createForm()        
    }

    createForm() {
        this.myForm = this.fb.group({
            dictionaryName: ['', [Validators.required]],
            dictionaryCode: ['',[Validators.required]],
            dictionaryDescription: ['',[]],
            weight : [0,[Validators.required,Validators.max(100),Validators.min(0)]]
        });
        if (this.data.type == 'edit'){
            for (let key in this.myForm.controls) {
                this.myForm.controls[key].setValue(this.data.info[key])
            }           
        }
    }

    async postDate() {
        try{
            this.loading = true 
            if (this.data.type == 'create'){
                   await this._AuditLevelService.createAuditLevel(this.myForm.value)  
            }else{
                let info : GeneralArchiveSettingRowData = Object.assign(this.data.info,this.myForm.value)
                await this._AuditLevelService.updateAuditLevel(info) 
            }            
            this.dialogRef.close(true)
            this.loading = false
        }catch(err){
            this.loading = false
        }        
    }

}
