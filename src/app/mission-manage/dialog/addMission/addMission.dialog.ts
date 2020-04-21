import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MissionManageService } from '../../mission-manage.service';
import { FormErrorMessageService } from '../../../core/services/formErrorMessage.service';
import * as _moment from 'moment';

@Component({
    selector: 'add-mission-dialog',
    templateUrl: './addMission.dialog.html',
    styleUrls: ['./addMission.dialog.scss'],
})
export class addMissionComponent {
    loading: boolean = false;
    myForm: FormGroup;
    accessoryIdList : any[] = []
    constructor(
        private _MissionManageService : MissionManageService,
        private fb: FormBuilder,
        public _formErrorMessageService: FormErrorMessageService,
        public dialogRef: MatDialogRef<addMissionComponent>,
        @Inject(MAT_DIALOG_DATA) public data 
    ) {
        this.createForm()        
    }

    createForm() {
        this.myForm = this.fb.group({
            chooseGroupInfo : [[],[]],
            taskTitle: ['', [Validators.required]],
            startAt: ['',[]],
            endAt: ['',[]],
            alarmTime : ['',[]],
            taskPrior : [0,[]],
            isScore : [true,[]],
            taskDesc : ['']
        });
    }
    uploadFinish(e){
        this.accessoryIdList.push({
            id : e.data,
            name : e.name
        })        
    }

    async postDate() {
        try{
            this.loading = true  
            let info = Object.assign({},this.myForm.value)                                         
            let unitAndOwnerList = info.chooseGroupInfo.map(c=>JSON.parse(c))
            info.unitList = unitAndOwnerList.filter(c=>c.type == 'unitList')                   
            delete info.chooseGroupInfo            
            info.isScore = info.isScore == true ? 1 : 0 
            info.startAt = info.startAt ? _moment(info.startAt).format("YYYY-MM-DD") : ''
            info.endAt = info.endAt ? _moment(info.endAt).format("YYYY-MM-DD") : ''
            info.alarmTime = info.alarmTime ? _moment(info.alarmTime).format("YYYY-MM-DD") : ''
            info.accessoryIdList = this.accessoryIdList.map(c=>c.id)                                    
            await this._MissionManageService.addMission(info)
            this.dialogRef.close(true)
            this.loading = false
        }catch(err){
            console.log(err)
            this.loading = false
        }        
    }

}
