import { SymbolInfolService } from './../../symbol-info.service';
import { FormErrorMessageService } from '../../../../../core/services/formErrorMessage.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
    selector: 're-self-evaluation-dialog',
    templateUrl: './reSelfEvaluation.dialog.html',
    styleUrls: ['./reSelfEvaluation.dialog.scss'],
})
export class reSelfEvaluationComponent {
    loading: boolean = false;
    myForm: FormGroup;
    constructor(
        private _SymbolInfolService : SymbolInfolService,
        private fb: FormBuilder,
        public _formErrorMessageService: FormErrorMessageService,
        public dialogRef: MatDialogRef<reSelfEvaluationComponent>,
        @Inject(MAT_DIALOG_DATA) public data 
    ) { 
    }

    public async changeEvaluationSingle(e){
        this.data.info.evalEventQuest.itemIdsAudit = e.value
    }

    public async changeEvaluation(e,id){         
        let itemIdsAudit = this.data.info.evalEventQuest.itemIdsAudit ? this.data.info.evalEventQuest.itemIdsAudit.split(',') : []
        if (e.checked){
            itemIdsAudit.push(id)   
        } else {
            itemIdsAudit.splice(itemIdsAudit.indexOf(id),1)
        }
        this.data.info.evalEventQuest.itemIdsAudit = itemIdsAudit.join(',')  
    }

    public isChecked(id){
        let itemIdsAudit = this.data.info.evalEventQuest.itemIdsAudit || ''
        if (itemIdsAudit.indexOf(id) >= 0){
            return true 
        }
        return false 
    }

    async postDate() {
        try{
            this.loading = true 
            if (!this.data.isFinished){
                await this._SymbolInfolService.disagreeSelfEvaluation(this.data.info.evalEventQuest)
            }else{
                await this._SymbolInfolService.finishReSelfEvaluation(this.data.info.evalEventQuest)
            }                        
            this.dialogRef.close(true)
            this.loading = false
        }catch(err){
            this.loading = false
        }        
    }

}
