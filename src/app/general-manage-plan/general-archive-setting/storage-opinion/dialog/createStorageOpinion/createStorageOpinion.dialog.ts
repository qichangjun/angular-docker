import { GeneralArchiveSettingRowData } from './../../../general-archive-setting.interface';
import { StorageOpinionService } from './../../storage-opinion.service';
import { FormErrorMessageService } from '../../../../../core/services/formErrorMessage.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
    selector: 'create-Storage-opinion-dialog',
    templateUrl: './createStorageOpinion.dialog.html',
    styleUrls: ['./createStorageOpinion.dialog.scss'],
})
export class createStorageOpinionComponent {
    loading: boolean = false;
    myForm: FormGroup;
    constructor(
        private _StorageOpinionService : StorageOpinionService,
        private fb: FormBuilder,
        public _formErrorMessageService: FormErrorMessageService,
        public dialogRef: MatDialogRef<createStorageOpinionComponent>,
        @Inject(MAT_DIALOG_DATA) public data : {type:'create' | 'edit',info : GeneralArchiveSettingRowData}
    ) {
        this.createForm()        
    }

    createForm() {
        this.myForm = this.fb.group({
            dictionaryName: ['', [Validators.required]],
            dictionaryCode: ['',[Validators.required]],
            dictionaryDescription: ['',[]],
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
                   await this._StorageOpinionService.createStorageOpinion(this.myForm.value)  
            }else{
                let info : GeneralArchiveSettingRowData = Object.assign(this.data.info,this.myForm.value)
                await this._StorageOpinionService.updateStorageOpinion(info) 
            }            
            this.dialogRef.close(true)
            this.loading = false
        }catch(err){
            this.loading = false
        }        
    }

}
