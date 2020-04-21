import { SymbolItemService } from './../../symbol-item-setting.service';
import { FormErrorMessageService } from '../../../../../../core/services/formErrorMessage.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
    selector: 'create-kind-dialog',
    templateUrl: './createKind.dialog.html',
    styleUrls: ['./createKind.dialog.scss'],
})
export class createKindComponent {
    loading: boolean = false;
    myForm: FormGroup;
    constructor(
        private _SymbolItemService : SymbolItemService,
        private fb: FormBuilder,
        public _formErrorMessageService: FormErrorMessageService,
        public dialogRef: MatDialogRef<createKindComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.createForm()        
    }

    createForm() {
        this.myForm = this.fb.group({
            grpname: ['', [Validators.required]],
            grpdesc: ['',[]],
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
              
                let info = Object.assign({},this.myForm.value)
                info.parentid = this.data.id
                await this._SymbolItemService.createKind(info)
            }else{
                let info = Object.assign(this.data.info,this.myForm.value)
                info.parentid = this.data.id
                await this._SymbolItemService.editKind(info)
            }            
            this.dialogRef.close(true)
            this.loading = false
        }catch(err){
            this.loading = false
        }        
    }

}
