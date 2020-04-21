import { FormErrorMessageService } from '../../../../core/services/formErrorMessage.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WorkingModelervice } from '../../working-model.service';
@Component({
    selector: 'edit-working-model-score-dialog',
    templateUrl: './editWorkingModelScore.dialog.html',
    styleUrls: ['./editWorkingModelScore.dialog.scss'],
})
export class editWorkingModelScoreComponent {
    loading: boolean = false;
    myForm: FormGroup;
    constructor(
        private _WorkingModelervice : WorkingModelervice,
        private fb: FormBuilder,
        public _formErrorMessageService: FormErrorMessageService,
        public dialogRef: MatDialogRef<editWorkingModelScoreComponent>,
        @Inject(MAT_DIALOG_DATA) public data : {info : any}
    ) {
        this.createForm()        
    }

    createForm() {
        this.myForm = this.fb.group({
            score: ['', [Validators.required]],          
        });
        this.myForm.controls.score.setValue(this.data.info.score)
    }

    async postDate() {
        try{
            this.loading = true      
            let info = Object.assign(this.data.info,this.myForm.value)
            await this._WorkingModelervice.editWorkingModel(info)               
            this.dialogRef.close(true)
            this.loading = false
        }catch(err){
            this.loading = false
        }        
    }

}
