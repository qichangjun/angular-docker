import { SymbolLevelSettingData } from './../../symbol-level-setting.component';
import { SymbolLevelService } from './../../symbol-level-setting.service';
import { FormErrorMessageService } from '../../../../../../core/services/formErrorMessage.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
    selector: 'create-symbol-level-dialog',
    templateUrl: './createSymbolLevel.dialog.html',
    styleUrls: ['./createSymbolLevel.dialog.scss'],
})
export class createSymbolLevelComponent {
    loading: boolean = false;
    myForm: FormGroup;
    constructor(
        private _SymbolLevelService : SymbolLevelService,
        private fb: FormBuilder,
        public _formErrorMessageService: FormErrorMessageService,
        public dialogRef: MatDialogRef<createSymbolLevelComponent>,
        @Inject(MAT_DIALOG_DATA) public data : {type:'create' | 'edit',info:SymbolLevelSettingData}
    ) {
        this.createForm()        
    }

    createForm() {
        this.myForm = this.fb.group({
            dictionaryName: ['', [Validators.required]],
            dictionaryCode: ['',[Validators.required]],
            dictionaryDescription: ['',[]],
            score : [0,[Validators.required]]
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
                   await this._SymbolLevelService.createSymbolLevel(this.myForm.value)  
            }else{
                let info : SymbolLevelSettingData = Object.assign(this.data.info,this.myForm.value)
                await this._SymbolLevelService.updateSymbolLevel(info) 
            }            
            this.dialogRef.close(true)
            this.loading = false
        }catch(err){
            this.loading = false
        }        
    }

}
