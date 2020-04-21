import { StorageOpinionService } from './../../../storage-opinion/storage-opinion.service';
import { OpinionColumnRowData } from './../../opinion-column.component';
import { OpinionColumnService } from './../../opinion-column.service';
import { FormErrorMessageService } from '../../../../../core/services/formErrorMessage.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GeneralArchiveSettingRowData } from '../../../general-archive-setting.interface';
@Component({
    selector: 'create-opinion-column-dialog',
    templateUrl: './createOpinionColumn.dialog.html',
    styleUrls: ['./createOpinionColumn.dialog.scss'],
})
export class createOpinionColumnComponent {
    loading: boolean = false;
    myForm: FormGroup;
    opinionClass : GeneralArchiveSettingRowData[]
    constructor(
        private _StorageOpinionService : StorageOpinionService,
        private _OpinionColumnService : OpinionColumnService,
        private fb: FormBuilder,
        public _formErrorMessageService: FormErrorMessageService,
        public dialogRef: MatDialogRef<createOpinionColumnComponent>,
        @Inject(MAT_DIALOG_DATA) public data : {type:'create' | 'edit',info : OpinionColumnRowData}
    ) {
        this.createForm()     
        this.getStorageOpinionList()   
    }

    async getStorageOpinionList(){
        let res = await this._StorageOpinionService.getList({currentPage:1,pageSize:'9999'})
        this.opinionClass = res.data
    }

    createForm() {
        this.myForm = this.fb.group({
            parentId: ['', [Validators.required]],
            dictionaryName: ['',[Validators.required]],

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
                await this._OpinionColumnService.createOpinionColumn(this.myForm.value)  
            }else{
                let info : OpinionColumnRowData = Object.assign(this.data.info,this.myForm.value)
                await this._OpinionColumnService.updateOpinionColumn(info) 
            }            
            this.dialogRef.close(true)
            this.loading = false
        }catch(err){
            this.loading = false
        }        
    }

}
