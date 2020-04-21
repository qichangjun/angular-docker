import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import * as _moment from 'moment';
import { MissionManageService } from '../../../../../mission-manage/mission-manage.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormErrorMessageService } from '../../../../../core/services/formErrorMessage.service';

@Component({
    selector: 'check-unit-post-info-dialog',
    templateUrl: './checkUnitPostInfo.dialog.html',
    styleUrls: ['./checkUnitPostInfo.dialog.scss'],
})
export class checkUnitPostInfoComponent {
    loading: boolean = false;
    remarksAudit : string = ''
    accessoryIdList : any[] = []
    submitDec : string = ''
    myForm: FormGroup;
    constructor(
        private _MissionManageService : MissionManageService,
        public dialogRef: MatDialogRef<checkUnitPostInfoComponent>,
        private fb: FormBuilder,
        public _formErrorMessageService: FormErrorMessageService,
        @Inject(MAT_DIALOG_DATA) public data 
    ) {
        this.createForm()
        this.getMissionStreamFile()
        this.getMissionStreamDetail()
    }

    createForm() {
        this.myForm = this.fb.group({
            remarksAudit : ['',[Validators.maxLength(100)]],
        });
    }

    async getMissionStreamFile(){
        this.accessoryIdList = await this._MissionManageService.getMissionStreamFile(this.data.unit.id)
    }
    
    async getMissionStreamDetail(){
        let res = await this._MissionManageService.getMissionStreamDetail(this.data.unit.id)
        this.submitDec = res.submitDec
    }

    async reviewMission(){
        await this._MissionManageService.reviewMission(this.myForm.value.remarksAudit,this.data.unit.id)
        this.dialogRef.close(true)
    }

    async backMission(){
        await this._MissionManageService.backMission(this.myForm.value.remarksAudit,this.data.unit.id)
        this.dialogRef.close(true)
    }
}
