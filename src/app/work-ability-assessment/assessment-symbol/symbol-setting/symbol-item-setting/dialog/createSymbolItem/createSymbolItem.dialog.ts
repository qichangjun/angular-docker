import { SymbolItemService } from './../../symbol-item-setting.service';
import { FormErrorMessageService } from '../../../../../../core/services/formErrorMessage.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors,AsyncValidatorFn } from '@angular/forms';

@Component({
    selector: 'create-symbol-item-dialog',
    templateUrl: './createSymbolItem.dialog.html',
    styleUrls: ['./createSymbolItem.dialog.scss'],
})
export class createSymbolItemComponent {
    loading: boolean = false;
    myForm: FormGroup;
    constructor(
        private _SymbolItemService : SymbolItemService,
        private fb: FormBuilder,
        public _formErrorMessageService: FormErrorMessageService,
        public dialogRef: MatDialogRef<createSymbolItemComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.createForm()        
    }

   

    async createForm() {
        let validateCounterRange: ValidatorFn = (control: AbstractControl):
        ValidationErrors => {
        return (control.value.length == 0) ?
            { 'lengthError': { current: control.value, min: 1 } } : null;
        };
        this.myForm = this.fb.group({
            questName: ['', [Validators.required]],
            // questEvalType: ['M',[Validators.required]],
            questNeedVerify: [1,[Validators.required]],
            questCategory: ['S',[Validators.required]],
            questDescription: ['',[]],
            questItem : [[],[validateCounterRange]]
        });
        if (this.data.type == 'edit'){
            for (let key in this.myForm.controls) {
                if (this.data.info[key]){
                    this.myForm.controls[key].setValue(this.data.info[key])
                }                
            }   
            let questItem = await this._SymbolItemService.getQuestItemByQuestId(this.data.info.id)                
            this.myForm.controls['questItem'].setValue(questItem.data)
        }
    }

    async postDate() {
        try{
            this.loading = true 
            if (this.data.type == 'create'){
                let info = Object.assign({},this.myForm.value)
                let questItem = Object.assign([],info.questItem)
                delete info.questItem
                info.groupId = this.data.id
                let questId = await this._SymbolItemService.createQuestItem(info)
                questItem.forEach(c=>{
                    c.questId = questId
                })
                await this._SymbolItemService.createQuestItemScore(questItem)
            }else{
                let info = Object.assign(this.data.info,this.myForm.value)
                let questItem = Object.assign([],info.questItem)
                delete info.questItem
                info.groupId = this.data.id
                let questId = await this._SymbolItemService.updateQuestItem(info)
                questItem.forEach(c=>{
                    c.questId = questId
                })
                await this._SymbolItemService.createQuestItemScore(questItem)
          
            }            
            this.dialogRef.close(true)            
            this.loading = false
        }catch(err){
            this.loading = false
        }        
    }

}
